import { useEffect, useRef, useCallback } from "react";

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 168, g: 85, b: 247 };
}

function lerpColor(c1, c2, t) {
  return {
    r: Math.round(c1.r + (c2.r - c1.r) * t),
    g: Math.round(c1.g + (c2.g - c1.g) * t),
    b: Math.round(c1.b + (c2.b - c1.b) * t),
  };
}

function MagicRings({
  color = "#A855F7",
  colorTwo = "#6366F1",
  ringCount = 6,
  speed = 1,
  attenuation = 10,
  lineThickness = 2,
  baseRadius = 0.35,
  radiusStep = 0.1,
  scaleRate = 0.1,
  opacity = 1,
  blur = 0,
  noiseAmount = 0.1,
  rotation = 0,
  ringGap = 1.5,
  fadeIn = 0.7,
  fadeOut = 0.5,
  followMouse = false,
  mouseInfluence = 0.2,
  hoverScale = 1.2,
  parallax = 0.05,
  clickBurst = false,
}) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    animFrame: null,
    time: 0,
    mouse: { x: 0.5, y: 0.5 },
    target: { x: 0.5, y: 0.5 },
    scale: 1,
    targetScale: 1,
    burstProgress: 0,
    isBursting: false,
    offset: { x: 0, y: 0 },
  });

  const simplex = useCallback((x, y, t) => {
    return (
      Math.sin(x * 3.1 + t * 0.7) * 0.5 +
      Math.cos(y * 2.7 - t * 0.5) * 0.5
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const st = stateRef.current;
    const c1 = hexToRgb(color);
    const c2 = hexToRgb(colorTwo);

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      if (!followMouse && parallax === 0) return;
      const rect = canvas.getBoundingClientRect();
      st.target.x = (e.clientX - rect.left) / rect.width;
      st.target.y = (e.clientY - rect.top) / rect.height;
    };

    const handleMouseEnter = () => { st.targetScale = hoverScale; };
    const handleMouseLeave = () => {
      st.targetScale = 1;
      st.target.x = 0.5;
      st.target.y = 0.5;
    };

    const handleClick = () => {
      if (clickBurst && !st.isBursting) {
        st.isBursting = true;
        st.burstProgress = 0;
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // Smooth follow
      const lerpFactor = 0.06;
      st.mouse.x += (st.target.x - st.mouse.x) * lerpFactor;
      st.mouse.y += (st.target.y - st.mouse.y) * lerpFactor;
      st.scale += (st.targetScale - st.scale) * 0.08;

      // Parallax offset
      if (parallax > 0) {
        st.offset.x = (st.mouse.x - 0.5) * parallax * w;
        st.offset.y = (st.mouse.y - 0.5) * parallax * h;
      }

      // Burst
      let burstExtra = 0;
      if (st.isBursting) {
        st.burstProgress += 0.04;
        burstExtra = Math.sin(st.burstProgress * Math.PI) * 0.4;
        if (st.burstProgress >= 1) st.isBursting = false;
      }

      ctx.clearRect(0, 0, w, h);

      const cx = followMouse
        ? st.mouse.x * w + st.offset.x
        : w / 2 + st.offset.x;
      const cy = followMouse
        ? st.mouse.y * h + st.offset.y
        : h / 2 + st.offset.y;

      const minDim = Math.min(w, h);

      if (blur > 0) ctx.filter = `blur(${blur}px)`;

      for (let i = 0; i < ringCount; i++) {
        const t = i / (ringCount - 1 || 1);
        const ringColor = lerpColor(c1, c2, t);

        // Ring radius with scale pulse
        const baseR = minDim * (baseRadius + i * radiusStep);
        const pulseFactor =
          1 +
          Math.sin(st.time * speed + i * ringGap) * scaleRate +
          burstExtra * (1 - t * 0.5);
        const r = baseR * pulseFactor * st.scale;

        // Fade edges
        const globalFade = Math.min(
          st.time / (fadeIn * 60),
          1,
          (1 - st.time / (fadeOut * 1000)) || 1
        );

        // Attenuation: rings further out are more transparent
        const attFade = Math.exp(-i / attenuation) * (1 - i / (ringCount * 1.5));
        const ringOpacity = opacity * Math.max(0, attFade) * Math.max(0.2, globalFade);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((rotation * Math.PI) / 180 + st.time * speed * 0.01 * (i % 2 === 0 ? 1 : -1));

        ctx.beginPath();
        const segments = 120;
        for (let s = 0; s <= segments; s++) {
          const angle = (s / segments) * Math.PI * 2;
          const noise = simplex(
            Math.cos(angle) + i,
            Math.sin(angle) + i,
            st.time * speed * 0.02
          );
          const nr = r + noise * noiseAmount * minDim * 0.1;
          const px = Math.cos(angle) * nr;
          const py = Math.sin(angle) * nr;
          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        ctx.strokeStyle = `rgba(${ringColor.r},${ringColor.g},${ringColor.b},${ringOpacity})`;
        ctx.lineWidth = lineThickness;
        ctx.stroke();
        ctx.restore();
      }

      if (blur > 0) ctx.filter = "none";

      st.time++;
      st.animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(st.animFrame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
    };
  }, [
    color, colorTwo, ringCount, speed, attenuation, lineThickness,
    baseRadius, radiusStep, scaleRate, opacity, blur, noiseAmount,
    rotation, ringGap, fadeIn, fadeOut, followMouse, mouseInfluence,
    hoverScale, parallax, clickBurst, simplex,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        position: "absolute",
        inset: 0,
        pointerEvents: followMouse || clickBurst ? "auto" : "none",
      }}
    />
  );
}

export default MagicRings;
