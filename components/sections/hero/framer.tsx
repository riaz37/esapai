import * as React from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";

const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const mainGroupRef = useRef<SVGGElement>(null);
  const circle1Ref = useRef<SVGCircleElement>(null);
  const circle2Ref = useRef<SVGCircleElement>(null);
  const sweepRectRef = useRef<SVGRectElement>(null);
  const pathsGroupRef = useRef<SVGGElement>(null);

  const anim = useGSAPAnimations(svgRef);

  useGSAP(() => {
    const tl = anim.createTimeline();

    // Entrance animations - main group fades in
    // GSAP handles null refs gracefully, so no need for checks
    tl.to(mainGroupRef.current, {
      opacity: 0.8,
      duration: 1.5,
      ease: "power2.out",
    });

    // Staggered paths fade-in
    if (pathsGroupRef.current) {
      const paths = pathsGroupRef.current.querySelectorAll("path");
      anim.staggerFadeIn(paths, {
        duration: 1.2,
        stagger: 0.03,
        delay: 0.3,
        from: { opacity: 0, scale: 0.95 },
        to: { opacity: 1, scale: 1 },
      });
    }

    // Continuous floating animation - smooth, organic floating effect
    const floatDelay = 1.5;
    
    gsap.to(mainGroupRef.current, {
      y: -8,
      x: 10,
      duration: 5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: floatDelay,
    });
    
    gsap.to(mainGroupRef.current, {
      rotation: 1,
      duration: 6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: floatDelay,
    });
    
    gsap.to(mainGroupRef.current, {
      scale: 1.01,
      duration: 4.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: floatDelay,
    });

    // Continuous looping animations - always active and lively
    if (circle1Ref.current) {
      anim.animateSVGCircle(circle1Ref.current, {
        r: { from: 300, to: 380 },
        cx: { from: 320, to: 420 },
        cy: { from: 100, to: 80 },
        opacity: { from: 0.4, to: 0.75 },
        rotation: { from: -8, to: 6, origin: "360px 110px" },
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (circle2Ref.current) {
      anim.animateSVGCircle(circle2Ref.current, {
        r: { from: 200, to: 270 },
        cx: { from: 480, to: 570 },
        cy: { from: 220, to: 160 },
        opacity: { from: 0.3, to: 0.6 },
        rotation: { from: 5, to: -7, origin: "520px 220px" },
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (sweepRectRef.current) {
      anim.animateSVGRect(sweepRectRef.current, {
        x: { from: -400, to: 200 },
        opacity: { from: 0.1, to: 0.4 },
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (pathsGroupRef.current) {
      const gradientPaths = pathsGroupRef.current.querySelectorAll("path");
      anim.animateGradientPaths(gradientPaths, {
        count: 20,
        opacityRange: [0.7, 1.0],
        durationRange: [1.5, 3.5],
        stagger: 0.1,
      });
    }
  }, { scope: svgRef });

  return (
    <svg
      ref={svgRef}
      width={870}
      height={592}
      viewBox="0 0 870 592"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
    <g ref={mainGroupRef} className="gsap-fade-in" clipPath="url(#clip0_34_55175)">
      <g filter="url(#filter0_f_34_55175)">
        <mask
          id="mask0_34_55175"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={-709}
          y={-1002}
          width={1803}
          height={1753}
        >
          <g ref={pathsGroupRef}>
          <path
            d="M772.72 609.868L176.722 -279.557L-32.6243 -139.277L563.374 750.149L772.72 609.868Z"
            fill="url(#paint0_linear_34_55175)"
          />
          <path
            d="M782.72 609.868L186.722 -279.557L-22.6243 -139.277L573.374 750.149L782.72 609.868Z"
            fill="url(#paint1_linear_34_55175)"
          />
          <path
            opacity={0.9}
            d="M661.668 473.99L65.6698 -415.435L-143.676 -275.154L452.322 614.271L661.668 473.99Z"
            fill="url(#paint2_linear_34_55175)"
          />
          <path
            opacity={0.8}
            d="M613.35 416.805L17.3515 -472.621L-191.994 -332.34L404.004 557.086L613.35 416.805Z"
            fill="url(#paint3_linear_34_55175)"
          />
          <mask
            id="mask1_34_55175"
            style={{
              maskType: "luminance",
            }}
            maskUnits="userSpaceOnUse"
            x={-130}
            y={-8}
            width={1000}
            height={601}
          >
            <path
              d="M-130 592L870 592L870 -7.99998L-130 -7.99989L-130 592Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask1_34_55175)">
            <path
              d="M1165.39 264.736L569.394 -624.689L360.048 -484.408L956.046 405.018L1165.39 264.736Z"
              fill="url(#paint4_radial_34_55175)"
            />
          </g>
          <mask
            id="mask2_34_55175"
            style={{
              maskType: "luminance",
            }}
            maskUnits="userSpaceOnUse"
            x={-130}
            y={-8}
            width={1000}
            height={601}
          >
            <path
              d="M-130 592L870 592L870 -7.99998L-130 -7.99989L-130 592Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask2_34_55175)">
            <path
              d="M649.018 567.216C649.595 566.825 564.491 439.687 458.931 283.242C353.371 126.797 267.328 0.288932 266.75 0.676932C266.174 1.06792 351.279 128.208 456.838 284.654C562.398 441.098 648.44 567.606 649.018 567.216Z"
              fill="url(#paint5_radial_34_55175)"
            />
          </g>
          <path
            d="M713.264 433.014C714.766 431.997 573.547 220.074 397.837 -40.334C222.128 -300.742 78.4684 -511.023 76.9654 -510.012C75.4645 -508.994 216.685 -297.069 392.393 -36.66C568.101 223.749 711.761 434.028 713.264 433.014Z"
            fill="url(#paint6_radial_34_55175)"
          />
          <path
            d="M579.685 443.837C583.115 441.52 445.791 231.998 272.96 -24.1439C100.129 -280.286 -42.7629 -486.06 -46.1899 -483.746C-49.6189 -481.428 87.7101 -271.906 260.538 -15.762C433.371 240.377 576.259 446.15 579.685 443.837Z"
            fill="url(#paint7_radial_34_55175)"
          />
          <path
            d="M700.189 533.026C701.271 532.295 593.664 370.923 459.843 172.593C326.021 -25.733 216.657 -185.925 215.577 -185.194C214.495 -184.461 322.102 -23.09 455.925 175.24C589.746 373.568 699.107 533.758 700.189 533.026Z"
            fill="url(#paint8_radial_34_55175)"
          />
          <path
            d="M792.711 683.109C793.793 682.379 686.186 521.006 552.365 322.676C418.543 124.35 309.18 -35.8399 308.1 -35.1089C307.018 -34.3769 414.625 126.994 548.448 325.324C682.268 523.651 791.629 683.841 792.711 683.109Z"
            fill="url(#paint9_radial_34_55175)"
          />
          <path
            d="M796.387 14.9279C822.19 -2.46111 700.811 -227.75 525.278 -488.277C349.743 -748.804 186.527 -945.91 160.724 -928.525C134.921 -911.136 256.305 -685.845 431.838 -425.32C607.371 -164.793 770.584 32.3119 796.387 14.9279Z"
            fill="url(#paint10_radial_34_55175)"
          />
          <path
            d="M792.72 609.868L196.722 -279.557L-12.6243 -139.277L583.374 750.149L792.72 609.868Z"
            fill="url(#paint11_linear_34_55175)"
          />
          <path
            d="M802.72 609.868L206.722 -279.557L-2.62435 -139.277L593.374 750.149L802.72 609.868Z"
            fill="url(#paint12_linear_34_55175)"
          />
          <path
            d="M679.947 582.415C681.027 581.685 573.422 420.312 439.601 221.982C305.779 23.6561 196.415 -136.536 195.333 -135.805C194.253 -135.073 301.858 26.2991 435.681 224.629C569.502 422.957 678.863 583.146 679.947 582.415Z"
            fill="url(#paint13_radial_34_55175)"
          />
          <path
            d="M602.354 458.528C603.436 457.798 495.829 296.426 362.008 98.0951C228.186 -100.231 118.823 -260.423 117.742 -259.692C116.66 -258.96 224.267 -97.5879 358.09 100.742C491.91 299.07 601.272 459.26 602.354 458.528Z"
            fill="url(#paint14_radial_34_55175)"
          />
          <path
            d="M246.315 455.444L-349.684 -433.98L-559.029 -293.701L36.9694 595.726L246.315 455.444Z"
            fill="url(#paint15_linear_34_55175)"
          />
          <path
            d="M256.315 455.444L-339.684 -433.98L-549.029 -293.701L46.9694 595.726L256.315 455.444Z"
            fill="url(#paint16_linear_34_55175)"
          />
          <path
            d="M266.315 455.444L-329.684 -433.98L-539.029 -293.701L56.9694 595.726L266.315 455.444Z"
            fill="url(#paint17_linear_34_55175)"
          />
          <path
            opacity={0.9}
            d="M145.265 319.566L-450.733 -569.859L-660.079 -429.578L-64.0813 459.848L145.265 319.566Z"
            fill="url(#paint18_linear_34_55175)"
          />
          <path
            opacity={0.8}
            d="M96.9443 262.381L-499.054 -627.045L-708.399 -486.764L-112.401 402.662L96.9443 262.381Z"
            fill="url(#paint19_linear_34_55175)"
          />
          <path
            d="M196.859 278.59C198.361 277.574 57.1422 65.6511 -118.567 -194.758C-294.276 -455.167 -437.936 -665.447 -439.44 -664.436C-440.94 -663.418 -299.719 -451.493 -124.012 -191.084C51.6972 69.3241 195.356 279.605 196.859 278.59Z"
            fill="url(#paint20_radial_34_55175)"
          />
          <path
            d="M63.2789 289.414C66.7089 287.096 -70.6141 77.5741 -243.446 -178.569C-416.276 -434.712 -559.169 -640.485 -562.596 -638.171C-566.024 -635.853 -428.696 -426.331 -255.867 -170.187C-83.033 85.953 59.8539 291.727 63.2789 289.414Z"
            fill="url(#paint21_radial_34_55175)"
          />
          <path
            d="M183.785 378.602C184.866 377.872 77.2599 216.5 -56.5601 18.17C-190.382 -180.156 -299.746 -340.348 -300.827 -339.617C-301.908 -338.885 -194.302 -177.513 -60.4791 20.8171C73.3409 219.145 182.702 379.334 183.785 378.602Z"
            fill="url(#paint22_radial_34_55175)"
          />
          <path
            d="M276.307 528.686C277.388 527.956 169.782 366.583 35.9613 168.254C-97.8607 -30.0739 -207.225 -190.264 -208.306 -189.533C-209.387 -188.801 -101.781 -27.4289 32.0423 170.901C165.862 369.227 275.224 529.417 276.307 528.686Z"
            fill="url(#paint23_radial_34_55175)"
          />
          <path
            d="M276.315 455.444L-319.684 -433.98L-529.029 -293.701L66.9694 595.726L276.315 455.444Z"
            fill="url(#paint24_linear_34_55175)"
          />
          <path
            d="M286.315 455.444L-309.684 -433.98L-519.029 -293.701L76.9694 595.726L286.315 455.444Z"
            fill="url(#paint25_linear_34_55175)"
          />
          <path
            d="M163.543 427.991C164.624 427.261 57.0177 265.889 -76.8033 67.5582C-210.625 -130.768 -319.989 -290.96 -321.07 -290.229C-322.151 -289.497 -214.545 -128.125 -80.7223 70.2052C53.0987 268.533 162.46 428.723 163.543 427.991Z"
            fill="url(#paint26_radial_34_55175)"
          />
          <path
            d="M85.949 304.104C87.03 303.374 -20.576 142.002 -154.397 -56.3288C-288.219 -254.655 -397.583 -414.847 -398.664 -414.116C-399.745 -413.384 -292.139 -252.013 -158.316 -53.6818C-24.4951 144.647 84.866 304.836 85.949 304.104Z"
            fill="url(#paint27_radial_34_55175)"
          />
          <path
            d="M499.418 504.802L-96.5802 -384.623L-305.926 -244.344L290.072 645.083L499.418 504.802Z"
            fill="url(#paint28_linear_34_55175)"
          />
          <path
            d="M509.418 504.802L-86.5802 -384.623L-295.926 -244.344L300.072 645.083L509.418 504.802Z"
            fill="url(#paint29_linear_34_55175)"
          />
          <path
            d="M519.418 504.802L-76.5802 -384.623L-285.926 -244.344L310.072 645.083L519.418 504.802Z"
            fill="url(#paint30_linear_34_55175)"
          />
          <path
            opacity={0.9}
            d="M398.367 368.924L-197.631 -520.502L-406.977 -380.221L189.022 509.205L398.367 368.924Z"
            fill="url(#paint31_linear_34_55175)"
          />
          <path
            opacity={0.8}
            d="M350.048 311.738L-245.95 -577.688L-455.296 -437.406L140.702 452.02L350.048 311.738Z"
            fill="url(#paint32_linear_34_55175)"
          />
          <path
            d="M449.963 327.947C451.465 326.93 310.246 115.008 134.537 -145.401C-41.1724 -405.81 -184.832 -616.09 -186.336 -615.079C-187.836 -614.061 -46.6154 -402.136 129.092 -141.727C304.801 118.682 448.459 328.962 449.963 327.947Z"
            fill="url(#paint33_radial_34_55175)"
          />
          <path
            d="M316.383 338.77C319.813 336.453 182.49 126.931 9.65841 -129.211C-163.172 -385.354 -306.065 -591.127 -309.492 -588.813C-312.92 -586.495 -175.592 -376.973 -2.76261 -120.829C170.07 135.31 312.957 341.084 316.383 338.77Z"
            fill="url(#paint34_radial_34_55175)"
          />
          <path
            d="M436.889 427.96C437.97 427.23 330.364 265.857 196.543 67.527C62.7214 -130.799 -46.6427 -290.99 -47.7237 -290.26C-48.8047 -289.527 58.8013 -128.156 192.624 70.174C326.444 268.502 435.806 428.691 436.889 427.96Z"
            fill="url(#paint35_radial_34_55175)"
          />
          <path
            d="M529.41 578.043C530.491 577.312 422.885 415.94 289.064 217.611C155.242 19.2831 45.8778 -140.907 44.7968 -140.176C43.7158 -139.444 151.322 21.9271 285.145 220.258C418.966 418.585 528.327 578.774 529.41 578.043Z"
            fill="url(#paint36_radial_34_55175)"
          />
          <path
            d="M529.418 504.802L-66.5802 -384.623L-275.926 -244.344L320.072 645.083L529.418 504.802Z"
            fill="url(#paint37_linear_34_55175)"
          />
          <path
            d="M539.418 504.802L-56.5802 -384.623L-265.926 -244.344L330.072 645.083L539.418 504.802Z"
            fill="url(#paint38_linear_34_55175)"
          />
          <path
            d="M416.646 477.349C417.727 476.619 310.121 315.246 176.3 116.916C42.4782 -81.4099 -66.8858 -241.602 -67.9668 -240.871C-69.0478 -240.139 38.5582 -78.7669 172.381 119.563C306.201 317.891 415.562 478.08 416.646 477.349Z"
            fill="url(#paint39_radial_34_55175)"
          />
          <path
            d="M339.052 353.462C340.133 352.732 232.527 191.36 98.7064 -6.97087C-35.1156 -205.297 -144.479 -365.489 -145.561 -364.758C-146.642 -364.026 -39.0355 -202.654 94.7875 -4.32383C228.608 194.004 337.969 354.193 339.052 353.462Z"
            fill="url(#paint40_radial_34_55175)"
          />
          <path
            d="M825.903 490.722L224.507 -395.063L432.993 -536.615L1034.39 349.17L825.903 490.722Z"
            fill="url(#paint41_linear_34_55175)"
          />
          <path
            d="M822.157 499.993L220.76 -385.791L429.247 -527.344L1030.65 358.441L822.157 499.993Z"
            fill="url(#paint42_linear_34_55175)"
          />
          <path
            d="M818.411 509.265L217.015 -376.519L425.502 -518.07L1026.9 367.714L818.411 509.265Z"
            fill="url(#paint43_linear_34_55175)"
          />
          <path
            opacity={0.9}
            d="M737.773 346.128L136.377 -539.656L344.865 -681.209L946.264 204.576L737.773 346.128Z"
            fill="url(#paint44_linear_34_55175)"
          />
          <path
            opacity={0.8}
            d="M702.853 279.904L101.457 -605.879L309.945 -747.432L911.342 138.353L702.853 279.904Z"
            fill="url(#paint45_linear_34_55175)"
          />
          <path
            d="M680.453 378.615C678.948 379.628 535.357 169.304 359.732 -91.1599C184.108 -351.627 42.9549 -563.597 44.4559 -564.613C45.9629 -565.623 189.554 -355.297 365.179 -94.8319C540.804 165.631 681.957 377.602 680.453 378.615Z"
            fill="url(#paint46_radial_34_55175)"
          />
          <path
            d="M740.527 258.818C737.094 261.131 594.27 55.3181 421.523 -200.881C248.776 -457.08 111.515 -666.65 114.943 -668.963C118.377 -671.272 261.199 -465.455 433.949 -209.258C606.693 46.9411 743.956 256.508 740.527 258.818Z"
            fill="url(#paint47_radial_34_55175)"
          />
          <path
            d="M778.082 403.959C776.998 404.689 667.686 244.467 533.928 46.0941C400.173 -152.277 292.615 -313.685 293.698 -314.414C294.781 -315.142 404.093 -154.922 537.849 43.4531C671.607 241.824 779.164 403.23 778.082 403.959Z"
            fill="url(#paint48_radial_34_55175)"
          />
          <path
            d="M882.576 545.966C881.494 546.695 772.182 386.473 638.424 188.102C504.669 -10.2709 397.111 -171.679 398.194 -172.408C399.278 -173.137 508.589 -12.9139 642.346 185.459C776.104 383.829 883.66 545.235 882.576 545.966Z"
            fill="url(#paint49_radial_34_55175)"
          />
          <path
            d="M814.664 518.537L213.268 -367.248L421.755 -508.799L1023.15 376.985L814.664 518.537Z"
            fill="url(#paint50_linear_34_55175)"
          />
          <path
            d="M810.918 527.809L209.522 -357.975L418.009 -499.527L1019.41 386.257L810.918 527.809Z"
            fill="url(#paint51_linear_34_55175)"
          />
          <path
            d="M831.456 403.691C830.372 404.42 721.061 244.199 587.304 45.8261C453.548 -152.545 345.991 -313.953 347.074 -314.684C348.157 -315.411 457.469 -155.19 591.226 43.1851C724.981 241.557 832.539 402.962 831.456 403.691Z"
            fill="url(#paint52_radial_34_55175)"
          />
          <path
            d="M745.656 285.34C744.575 286.069 635.263 125.848 501.506 -72.5249C367.75 -270.896 260.193 -432.304 261.275 -433.035C262.359 -433.762 371.67 -273.541 505.426 -75.1659C639.184 123.205 746.742 284.611 745.656 285.34Z"
            fill="url(#paint53_radial_34_55175)"
          />
          <path
            d="M752.563 236.754L151.167 -649.031L359.654 -790.584L961.053 95.201L752.563 236.754Z"
            fill="url(#paint54_linear_34_55175)"
          />
          <path
            d="M748.817 246.025L147.421 -639.76L355.908 -781.313L957.307 104.473L748.817 246.025Z"
            fill="url(#paint55_linear_34_55175)"
          />
          <path
            d="M745.071 255.297L143.675 -630.488L352.162 -772.039L953.561 113.746L745.071 255.297Z"
            fill="url(#paint56_linear_34_55175)"
          />
          <path
            opacity={0.9}
            d="M664.434 92.16L63.037 -793.625L271.525 -935.178L872.924 -49.393L664.434 92.16Z"
            fill="url(#paint57_linear_34_55175)"
          />
          <path
            opacity={0.8}
            d="M629.513 25.9351L28.1171 -859.848L236.606 -1001.4L838.002 -115.615L629.513 25.9351Z"
            fill="url(#paint58_linear_34_55175)"
          />
          <path
            d="M607.113 124.647C605.608 125.661 462.017 -84.664 286.392 -345.128C110.768 -605.595 -30.385 -817.566 -28.884 -818.581C-27.377 -819.591 116.214 -609.265 291.839 -348.8C467.464 -88.338 608.617 123.635 607.113 124.647Z"
            fill="url(#paint59_radial_34_55175)"
          />
          <path
            d="M667.188 4.85002C663.755 7.16302 520.931 -198.65 348.184 -454.849C175.437 -711.048 38.1756 -920.619 41.6036 -922.931C45.0376 -925.24 187.86 -719.423 360.61 -463.226C533.355 -207.027 670.617 2.53902 667.188 4.85002Z"
            fill="url(#paint60_radial_34_55175)"
          />
          <path
            d="M704.742 149.99C703.658 150.72 594.348 -9.50196 460.589 -207.875C326.834 -406.246 219.275 -567.654 220.359 -568.383C221.443 -569.112 330.754 -408.891 464.51 -210.516C598.268 -12.144 705.824 149.262 704.742 149.99Z"
            fill="url(#paint61_radial_34_55175)"
          />
          <path
            d="M809.236 291.997C808.154 292.725 698.843 132.504 565.084 -65.867C431.329 -264.24 323.771 -425.648 324.854 -426.377C325.938 -427.106 435.248 -266.883 569.006 -68.51C702.764 129.861 810.32 291.267 809.236 291.997Z"
            fill="url(#paint62_radial_34_55175)"
          />
          <path
            d="M741.325 264.568L139.929 -621.217L348.416 -762.768L949.814 123.018L741.325 264.568Z"
            fill="url(#paint63_linear_34_55175)"
          />
          <path
            d="M737.579 273.84L136.184 -611.943L344.67 -753.496L946.068 132.289L737.579 273.84Z"
            fill="url(#paint64_linear_34_55175)"
          />
          <path
            d="M758.117 149.723C757.033 150.452 647.722 -9.76899 513.965 -208.142C380.209 -406.513 272.653 -567.921 273.735 -568.652C274.818 -569.379 384.129 -409.158 517.887 -210.783C651.643 -12.412 759.2 148.994 758.117 149.723Z"
            fill="url(#paint65_radial_34_55175)"
          />
          <path
            d="M672.317 31.371C671.236 32.1 561.924 -128.121 428.167 -326.494C294.411 -524.865 186.853 -686.273 187.936 -687.004C189.02 -687.731 298.332 -527.51 432.088 -329.135C565.845 -130.764 673.403 30.643 672.317 31.371Z"
            fill="url(#paint66_radial_34_55175)"
          />
          <path
            d="M885.318 267.672L283.922 -618.113L492.41 -759.666L1093.81 126.119L885.318 267.672Z"
            fill="url(#paint67_linear_34_55175)"
          />
          <path
            d="M881.572 276.943L280.175 -608.842L488.663 -750.395L1090.06 135.391L881.572 276.943Z"
            fill="url(#paint68_linear_34_55175)"
          />
          <path
            d="M877.826 286.215L276.43 -599.57L484.918 -741.121L1086.31 144.664L877.826 286.215Z"
            fill="url(#paint69_linear_34_55175)"
          />
          <path
            opacity={0.9}
            d="M797.189 123.078L195.793 -762.707L404.281 -904.26L1005.68 -18.4749L797.189 123.078Z"
            fill="url(#paint70_linear_34_55175)"
          />
          <path
            opacity={0.8}
            d="M762.268 56.8541L160.872 -828.93L369.359 -970.482L970.758 -84.697L762.268 56.8541Z"
            fill="url(#paint71_linear_34_55175)"
          />
          <path
            d="M739.869 155.565C738.363 156.579 594.773 -53.7461 419.148 -314.21C243.523 -574.677 102.37 -786.648 103.871 -787.663C105.379 -788.673 248.969 -578.347 424.594 -317.882C600.219 -57.42 741.372 154.553 739.869 155.565Z"
            fill="url(#paint72_radial_34_55175)"
          />
          <path
            d="M799.943 35.768C796.509 38.081 653.685 -167.732 480.938 -423.931C308.191 -680.13 170.93 -889.701 174.359 -892.013C177.793 -894.322 320.614 -688.505 493.365 -432.308C666.109 -176.109 803.371 33.457 799.943 35.768Z"
            fill="url(#paint73_radial_34_55175)"
          />
          <path
            d="M837.497 180.908C836.414 181.638 727.103 21.4161 593.343 -176.957C459.589 -375.328 352.03 -536.736 353.113 -537.465C354.198 -538.194 463.508 -377.973 597.265 -179.598C731.023 18.7731 838.58 180.18 837.497 180.908Z"
            fill="url(#paint74_radial_34_55175)"
          />
          <path
            d="M941.992 322.915C940.909 323.644 831.597 163.422 697.84 -34.9489C564.084 -233.322 456.527 -394.73 457.61 -395.459C458.693 -396.188 568.005 -235.965 701.762 -37.5919C835.519 160.779 943.075 322.185 941.992 322.915Z"
            fill="url(#paint75_radial_34_55175)"
          />
          <path
            d="M874.079 295.486L272.683 -590.299L481.171 -731.85L1082.57 153.935L874.079 295.486Z"
            fill="url(#paint76_linear_34_55175)"
          />
          <path
            d="M870.333 304.758L268.938 -581.025L477.425 -722.578L1078.82 163.207L870.333 304.758Z"
            fill="url(#paint77_linear_34_55175)"
          />
          <path
            d="M890.872 180.641C889.789 181.37 780.478 21.1491 646.719 -177.224C512.964 -375.595 405.407 -537.003 406.489 -537.734C407.572 -538.461 516.884 -378.24 650.641 -179.865C784.398 18.5061 891.955 179.912 890.872 180.641Z"
            fill="url(#paint78_radial_34_55175)"
          />
          <path
            d="M805.072 62.289C803.99 63.017 694.678 -97.2029 560.921 -295.576C427.166 -493.947 319.608 -655.355 320.691 -656.086C321.775 -656.813 431.086 -496.592 564.842 -298.217C698.6 -99.8459 806.157 61.56 805.072 62.289Z"
            fill="url(#paint79_radial_34_55175)"
          />
          <path
            d="M424.732 565.644L-171.266 -323.781L-380.611 -183.502L215.387 705.925L424.732 565.644Z"
            fill="url(#paint80_linear_34_55175)"
          />
          <path
            d="M434.732 565.644L-161.266 -323.781L-370.611 -183.502L225.387 705.925L434.732 565.644Z"
            fill="url(#paint81_linear_34_55175)"
          />
          <path
            d="M444.732 565.644L-151.266 -323.781L-360.611 -183.502L235.387 705.925L444.732 565.644Z"
            fill="url(#paint82_linear_34_55175)"
          />
          <path
            opacity={0.9}
            d="M323.683 429.766L-272.316 -459.66L-481.661 -319.379L114.337 570.047L323.683 429.766Z"
            fill="url(#paint83_linear_34_55175)"
          />
          <path
            opacity={0.8}
            d="M275.362 372.58L-320.636 -516.846L-529.981 -376.565L66.0173 512.861L275.362 372.58Z"
            fill="url(#paint84_linear_34_55175)"
          />
          <path
            d="M241.698 399.612C245.128 397.295 107.805 187.773 -65.0272 -68.3689C-237.857 -324.512 -380.75 -530.285 -384.177 -527.971C-387.605 -525.653 -250.277 -316.131 -77.4482 -59.9869C95.3859 196.152 238.273 401.926 241.698 399.612Z"
            fill="url(#paint85_radial_34_55175)"
          />
          <path
            d="M454.732 565.644L-141.266 -323.781L-350.611 -183.502L245.387 705.925L454.732 565.644Z"
            fill="url(#paint86_linear_34_55175)"
          />
          <path
            d="M464.732 565.644L-131.266 -323.781L-340.611 -183.502L255.387 705.925L464.732 565.644Z"
            fill="url(#paint87_linear_34_55175)"
          />
          </g>
        </mask>
        <g mask="url(#mask0_34_55175)">
          <rect
            x={-130}
            y={-7.99994}
            width={1000}
            height={600}
            fill="#13F584"
          />
          <circle
            ref={circle1Ref}
            cx={360}
            cy={110}
            r={320}
            fill="url(#sunPulseGradient)"
            opacity={0.55}
            style={{
              mixBlendMode: "screen",
            }}
          />
          <circle
            ref={circle2Ref}
            cx={520}
            cy={220}
            r={220}
            fill="url(#sunRayGradient)"
            opacity={0.4}
            style={{
              mixBlendMode: "screen",
            }}
          />
          <rect
            ref={sweepRectRef}
            x={-300}
            y={-40}
            width={1300}
            height={680}
            fill="url(#sunSweepGradient)"
            opacity={0.28}
            style={{
              mixBlendMode: "screen",
            }}
          />
        </g>
      </g>
    </g>
    <defs>
      <filter
        id="filter0_f_34_55175"
        x={-164}
        y={-41.9999}
        width={1068}
        height={668}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation={17}
          result="effect1_foregroundBlur_34_55175"
        />
      </filter>
      <linearGradient
        id="paint0_linear_34_55175"
        x1={568.151}
        y1={32.2918}
        x2={420.061}
        y2={184.045}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint1_linear_34_55175"
        x1={578.151}
        y1={32.2918}
        x2={430.061}
        y2={184.045}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint2_linear_34_55175"
        x1={457.099}
        y1={-103.586}
        x2={309.01}
        y2={48.1672}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint3_linear_34_55175"
        x1={408.781}
        y1={-160.772}
        x2={260.691}
        y2={-9.01832}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <radialGradient
        id="paint4_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(126.332 -41.03 -229.773 -467.854 932.821 -187.739)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint5_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(170.839 253.205 1.20666 -0.820528 457.883 283.947)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2352F" />
        <stop offset={1} stopColor="#F2352F" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint6_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(284.596 421.774 3.13964 -2.12529 395.114 -38.499)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2352F" />
        <stop offset={1} stopColor="#F2352F" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint7_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(280.148 415.235 7.14636 -4.85312 266.748 -19.9548)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2352F" />
        <stop offset={1} stopColor="#F2352F" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint8_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.566 320.995 2.26749 -1.52541 457.884 173.916)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2352F" />
        <stop offset={1} stopColor="#F2352F" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint9_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.565 320.993 2.26748 -1.5254 550.406 324)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2352F" />
        <stop offset={1} stopColor="#F2352F" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint10_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(284.336 422.011 53.9349 -36.3269 478.557 -456.8)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2352F" />
        <stop offset={1} stopColor="#F2352F" stopOpacity={0} />
      </radialGradient>
      <linearGradient
        id="paint11_linear_34_55175"
        x1={588.151}
        y1={32.2918}
        x2={440.061}
        y2={184.045}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint12_linear_34_55175"
        x1={598.151}
        y1={32.2918}
        x2={450.061}
        y2={184.045}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <radialGradient
        id="paint13_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.596 321.039 2.26781 -1.52562 437.641 223.305)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2352F" />
        <stop offset={1} stopColor="#F2352F" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint14_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.568 320.997 2.26751 -1.52542 360.048 99.4183)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2352F" />
        <stop offset={1} stopColor="#F2352F" stopOpacity={0} />
      </radialGradient>
      <linearGradient
        id="paint15_linear_34_55175"
        x1={41.7459}
        y1={-122.132}
        x2={-106.344}
        y2={29.6216}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint16_linear_34_55175"
        x1={51.7459}
        y1={-122.132}
        x2={-96.3439}
        y2={29.6216}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint17_linear_34_55175"
        x1={61.7459}
        y1={-122.132}
        x2={-86.3439}
        y2={29.6216}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint18_linear_34_55175"
        x1={-59.3041}
        y1={-258.01}
        x2={-207.394}
        y2={-106.256}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2352F" />
        <stop offset={1} stopColor="#F2352F" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint19_linear_34_55175"
        x1={-107.624}
        y1={-315.196}
        x2={-255.714}
        y2={-163.442}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2352F" />
        <stop offset={1} stopColor="#F2352F" stopOpacity={0} />
      </linearGradient>
      <radialGradient
        id="paint20_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(284.61 421.794 3.13979 -2.12539 -121.29 -192.922)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2352F" />
        <stop offset={1} stopColor="#F2352F" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint21_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(280.148 415.236 7.14637 -4.85313 -249.657 -174.378)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2352F" />
        <stop offset={1} stopColor="#F2352F" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint22_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.582 321.018 2.26766 -1.52552 -58.5205 19.4924)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2352F" />
        <stop offset={1} stopColor="#F2352F" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint23_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.581 321.016 2.26765 -1.52551 34.0011 169.576)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2352F" />
        <stop offset={1} stopColor="#F2352F" stopOpacity={0} />
      </radialGradient>
      <linearGradient
        id="paint24_linear_34_55175"
        x1={71.7459}
        y1={-122.132}
        x2={-76.3439}
        y2={29.6216}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint25_linear_34_55175"
        x1={81.7459}
        y1={-122.132}
        x2={-66.3439}
        y2={29.6216}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <radialGradient
        id="paint26_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.582 321.018 2.26766 -1.52552 -78.7629 68.8813)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint27_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.581 321.016 2.26764 -1.52551 -156.356 -55.0056)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <linearGradient
        id="paint28_linear_34_55175"
        x1={294.849}
        y1={-72.7744}
        x2={146.759}
        y2={78.9789}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint29_linear_34_55175"
        x1={304.849}
        y1={-72.7744}
        x2={156.759}
        y2={78.9789}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint30_linear_34_55175"
        x1={314.849}
        y1={-72.7744}
        x2={166.759}
        y2={78.9789}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint31_linear_34_55175"
        x1={193.799}
        y1={-208.653}
        x2={45.7092}
        y2={-56.899}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint32_linear_34_55175"
        x1={145.479}
        y1={-265.838}
        x2={-2.61062}
        y2={-114.085}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <radialGradient
        id="paint33_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(284.61 421.794 3.13979 -2.12539 131.813 -143.565)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint34_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(280.148 415.235 7.14636 -4.85313 3.44637 -125.021)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint35_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.582 321.018 2.26766 -1.52552 194.583 68.8497)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint36_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.582 321.018 2.26766 -1.52552 287.104 218.934)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <linearGradient
        id="paint37_linear_34_55175"
        x1={324.849}
        y1={-72.7744}
        x2={176.759}
        y2={78.9789}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint38_linear_34_55175"
        x1={334.849}
        y1={-72.7744}
        x2={186.759}
        y2={78.9789}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <radialGradient
        id="paint39_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.581 321.016 2.26764 -1.52551 174.34 118.239)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint40_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.58 321.015 2.26764 -1.5255 96.7465 -5.64799)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <linearGradient
        id="paint41_linear_34_55175"
        x1={367.023}
        y1={84.6853}
        x2={563.196}
        y2={4.22604}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint42_linear_34_55175"
        x1={363.277}
        y1={93.9569}
        x2={559.45}
        y2={13.4974}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint43_linear_34_55175"
        x1={359.531}
        y1={103.229}
        x2={555.704}
        y2={22.7699}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint44_linear_34_55175"
        x1={278.894}
        y1={-59.9082}
        x2={475.067}
        y2={-140.368}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint45_linear_34_55175"
        x1={243.973}
        y1={-126.131}
        x2={440.147}
        y2={-206.591}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <radialGradient
        id="paint46_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(284.46 421.884 -3.13974 2.12536 362.454 -92.9984)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint47_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(279.511 414.502 -7.18605 4.84393 427.735 -205.072)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint48_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.474 321.021 -2.26739 1.52533 535.889 44.7733)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint49_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.506 321.069 -2.26773 1.52556 640.384 186.779)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <linearGradient
        id="paint50_linear_34_55175"
        x1={355.785}
        y1={112.501}
        x2={551.958}
        y2={32.0419}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint51_linear_34_55175"
        x1={352.039}
        y1={121.773}
        x2={548.212}
        y2={41.3134}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <radialGradient
        id="paint52_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.489 321.043 -2.26754 1.52544 589.264 44.5046)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2352F" />
        <stop offset={1} stopColor="#F2352F" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint53_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.473 321.02 -2.26738 1.52533 503.465 -73.8473)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <linearGradient
        id="paint54_linear_34_55175"
        x1={293.684}
        y1={-169.283}
        x2={489.857}
        y2={-249.742}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2352F" />
        <stop offset={1} stopColor="#F2352F" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint55_linear_34_55175"
        x1={289.938}
        y1={-160.012}
        x2={486.111}
        y2={-240.471}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2352F" />
        <stop offset={1} stopColor="#F2352F" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint56_linear_34_55175"
        x1={286.192}
        y1={-150.739}
        x2={482.365}
        y2={-231.199}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint57_linear_34_55175"
        x1={205.554}
        y1={-313.877}
        x2={401.728}
        y2={-394.336}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint58_linear_34_55175"
        x1={170.634}
        y1={-380.1}
        x2={366.807}
        y2={-460.559}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2352F" />
        <stop offset={1} stopColor="#F2352F" stopOpacity={0} />
      </linearGradient>
      <radialGradient
        id="paint59_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(284.461 421.885 -3.13975 2.12537 289.114 -346.968)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint60_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(279.511 414.502 -7.18606 4.84394 354.395 -459.041)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint61_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.473 321.021 -2.26739 1.52533 462.549 -209.196)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint62_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.506 321.069 -2.26773 1.52556 567.045 -67.1896)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <linearGradient
        id="paint63_linear_34_55175"
        x1={282.446}
        y1={-141.468}
        x2={478.619}
        y2={-221.927}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint64_linear_34_55175"
        x1={278.7}
        y1={-132.196}
        x2={474.873}
        y2={-212.655}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <radialGradient
        id="paint65_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.488 321.041 -2.26753 1.52543 515.925 -209.464)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint66_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.475 321.022 -2.2674 1.52534 430.126 -327.816)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <linearGradient
        id="paint67_linear_34_55175"
        x1={426.439}
        y1={-138.365}
        x2={622.612}
        y2={-218.824}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint68_linear_34_55175"
        x1={422.692}
        y1={-129.093}
        x2={618.865}
        y2={-209.553}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint69_linear_34_55175"
        x1={418.947}
        y1={-119.821}
        x2={615.12}
        y2={-200.28}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint70_linear_34_55175"
        x1={338.31}
        y1={-282.959}
        x2={534.483}
        y2={-363.418}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint71_linear_34_55175"
        x1={303.388}
        y1={-349.182}
        x2={499.562}
        y2={-429.642}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <radialGradient
        id="paint72_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(284.448 421.866 -3.1396 2.12527 421.869 -316.049)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint73_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(279.516 414.51 -7.18619 4.84403 487.15 -428.122)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint74_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.488 321.042 -2.26754 1.52544 595.304 -178.277)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint75_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.506 321.069 -2.26773 1.52556 699.8 -36.2716)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <linearGradient
        id="paint76_linear_34_55175"
        x1={415.201}
        y1={-110.549}
        x2={611.373}
        y2={-191.009}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint77_linear_34_55175"
        x1={411.454}
        y1={-101.278}
        x2={607.627}
        y2={-181.737}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <radialGradient
        id="paint78_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.487 321.041 -2.26753 1.52543 648.679 -178.546)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="paint79_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(216.474 321.021 -2.26739 1.52533 562.88 -296.898)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </radialGradient>
      <radialGradient id="sunPulseGradient" cx={0.5} cy={0.35} r={0.9}>
        <stop offset={0} stopColor="#D6FFE3" stopOpacity={0.95}>
          <animate
            attributeName="stop-color"
            values="#D6FFE3;#F0FFF0;#D6FFE3"
            dur="12s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset={0.4} stopColor="#13F584" stopOpacity={0.2} />
        <stop offset={1} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <radialGradient id="sunRayGradient" cx={0.6} cy={0.4} r={0.8}>
        <stop offset={0} stopColor="#A1FFC6" stopOpacity={0.8} />
        <stop offset={0.45} stopColor="#13F584" stopOpacity={0.25} />
        <stop offset={1} stopColor="#13F584" stopOpacity={0} />
      </radialGradient>
      <linearGradient id="sunSweepGradient" x1={0} y1={0} x2={1} y2={0}>
        <stop offset={0} stopColor="#13F584" stopOpacity={0} />
        <stop offset={0.35} stopColor="#EAFFE6" stopOpacity={0.8} />
        <stop offset={0.5} stopColor="#FFFFFF" stopOpacity={0.85}>
          <animate
            attributeName="stop-color"
            values="#FFFFFF;#E2FFE5;#FFFFFF"
            dur="9s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset={0.65} stopColor="#EAFFE6" stopOpacity={0.6} />
        <stop offset={1} stopColor="#13F584" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint80_linear_34_55175"
        x1={220.164}
        y1={-11.9327}
        x2={72.0741}
        y2={139.821}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint81_linear_34_55175"
        x1={230.164}
        y1={-11.9327}
        x2={82.0741}
        y2={139.821}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint82_linear_34_55175"
        x1={240.164}
        y1={-11.9327}
        x2={92.0741}
        y2={139.821}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint83_linear_34_55175"
        x1={119.114}
        y1={-147.811}
        x2={-28.976}
        y2={3.94269}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2352F" />
        <stop offset={1} stopColor="#F2352F" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint84_linear_34_55175"
        x1={70.7941}
        y1={-204.996}
        x2={-77.2956}
        y2={-53.2427}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <radialGradient
        id="paint85_radial_34_55175"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(280.148 415.235 7.14636 -4.85313 -71.2386 -64.1795)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2352F" />
        <stop offset={1} stopColor="#F2352F" stopOpacity={0} />
      </radialGradient>
      <linearGradient
        id="paint86_linear_34_55175"
        x1={250.164}
        y1={-11.9327}
        x2={102.074}
        y2={139.821}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint87_linear_34_55175"
        x1={260.164}
        y1={-11.9327}
        x2={112.074}
        y2={139.821}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4CCD99" />
        <stop offset={1} stopColor="#4CCD99" stopOpacity={0} />
      </linearGradient>
      <clipPath id="clip0_34_55175">
        <rect
          width={1000}
          height={600}
          fill="white"
          transform="translate(870 592) rotate(180)"
        />
      </clipPath>
    </defs>
  </svg>
  );
};

export default SVGComponent;
