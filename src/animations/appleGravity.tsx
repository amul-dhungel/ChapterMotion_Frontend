import { makeScene2D } from '@motion-canvas/2d';
import { Circle, Line, Rect, Txt } from '@motion-canvas/2d/lib/components';
import { createRef } from '@motion-canvas/core/lib/utils';
import { all, waitFor } from '@motion-canvas/core/lib/flow';
import { createSignal } from '@motion-canvas/core/lib/utils';
import { easeInQuad } from '@motion-canvas/core/lib/tweening';

export default makeScene2D(function* (view) {
    // THEME SETTINGS (Chapter Motion branding)
    const CREAM = '#FDF5E6';
    const DEEP_BLUE = '#003366';
    const PURPLE = '#4A00E0';
    const CYAN = '#00D2FF';
    const GREEN = '#2E7D32';
    const BROWN = '#8B4513';
    const RED = '#FF0000';
    const YELLOW = '#FFD700';

    view.fill(CREAM);

    // Signals for animation
    const appleY = createSignal(-150);
    const arrowVisible = createSignal(1);

    // References
    const groundRef = createRef<Line>();
    const trunkRef = createRef<Rect>();
    const leavesRef = createRef<Circle>();
    const appleRef = createRef<Circle>();
    const arrowRef = createRef<Line>();
    const titleRef = createRef<Txt>();

    // SCENE SETUP
    view.add(
        <>
            {/* Title */}
            <Txt
                ref={titleRef}
                text="Apple Falling: Gravity in Action"
                fill={DEEP_BLUE}
                y={-280}
                fontFamily={'Montserrat'}
                fontWeight={700}
                fontSize={36}
            />

            {/* Ground */}
            <Line
                ref={groundRef}
                points={[[-400, 200], [400, 200]]}
                lineWidth={6}
                stroke={GREEN}
            />

            {/* Tree Trunk */}
            <Rect
                ref={trunkRef}
                width={40}
                height={150}
                fill={BROWN}
                x={-200}
                y={75}
            />

            {/* Tree Leaves */}
            <Circle
                ref={leavesRef}
                size={160}
                fill={GREEN}
                x={-200}
                y={-25}
            />

            {/* Apple */}
            <Circle
                ref={appleRef}
                size={40}
                fill={RED}
                x={-200}
                y={() => appleY()}
                stroke={CYAN}
                lineWidth={3}
            />

            {/* Gravity Arrow */}
            <Line
                ref={arrowRef}
                points={() => [
                    [-200, appleY() + 20],
                    [-200, appleY() + 100]
                ]}
                stroke={YELLOW}
                lineWidth={4}
                endArrow
                arrowSize={12}
                opacity={() => arrowVisible()}
            />

            {/* Gravity Label */}
            <Txt
                text="Gravity"
                fill={YELLOW}
                x={-140}
                y={() => appleY() + 60}
                fontSize={20}
                fontWeight={600}
                opacity={() => arrowVisible()}
            />

            {/* Physics Info */}
            <Txt
                text={() => `Height: ${Math.max(0, (200 - appleY()) / 10).toFixed(1)}m`}
                fill={PURPLE}
                x={200}
                y={-200}
                fontSize={24}
                fontFamily={'monospace'}
            />

            <Txt
                text="F = mg"
                fill={DEEP_BLUE}
                x={200}
                y={-150}
                fontSize={28}
                fontWeight={700}
            />
        </>
    );

    // ANIMATION SEQUENCE

    // 1. Fade in scene
    yield* all(
        titleRef().opacity(0).opacity(1, 1),
        groundRef().opacity(0).opacity(1, 1),
        trunkRef().opacity(0).opacity(1, 1),
        leavesRef().opacity(0).opacity(1, 1),
    );

    // 2. Show apple
    yield* appleRef().opacity(0).opacity(1, 0.5);
    yield* waitFor(0.5);

    // 3. Show gravity arrow
    yield* arrowRef().opacity(0).opacity(1, 0.5);
    yield* waitFor(1);

    // 4. Apple falls with acceleration (easeInQuad for gravity effect)
    yield* all(
        appleY(180, 1.5, easeInQuad),
        appleRef().fill(RED, 0.5).fill(PURPLE, 0.5).fill(RED, 0.5),
    );

    // 5. Hide arrow on impact
    yield* arrowVisible(0, 0.3);

    // 6. Impact effect - wiggle
    yield* all(
        appleRef().scale(1.2, 0.1).scale(1, 0.1),
        appleRef().rotation(10, 0.1).rotation(-10, 0.1).rotation(0, 0.1),
    );

    // 7. Final message
    const conclusionRef = createRef<Txt>();
    view.add(
        <Txt
            ref={conclusionRef}
            text="Newton's Law of Gravity!"
            fill={DEEP_BLUE}
            y={250}
            fontSize={32}
            fontWeight={700}
            opacity={0}
        />
    );

    yield* conclusionRef().opacity(1, 1);
    yield* waitFor(2);
});
