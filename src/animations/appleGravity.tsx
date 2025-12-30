import { makeScene2D } from '@motion-canvas/2d';
import { Circle, Line, Rect, Txt } from '@motion-canvas/2d/lib/components';
import { createRef } from '@motion-canvas/core/lib/utils';
import { all } from '@motion-canvas/core/lib/flow';
import { createSignal } from '@motion-canvas/core/lib/utils';
import { Vector2 } from '@motion-canvas/core/lib/types';

export default makeScene2D(function* (view) {
    // 1. THEME SETTINGS (Manim-style)
    const CREAM = '#FDF5E6';
    const DEEP_BLUE = '#003366';
    const PURPLE = '#4A00E0';
    const CYAN = '#00D2FF';
    view.fill(CREAM);

    const xPos = createSignal(0); // Displacement signal
    const springRef = createRef<Line>();
    const massRef = createRef<Rect>();

    // 2. CHAPTER 1: THE SETTING
    const wall = createRef<Line>();
    view.add(
        <>
            <Line
                ref={wall}
                points={[[-400, 200], [-400, -200]]}
                lineWidth={8}
                stroke={DEEP_BLUE}
            />
            <Line
                points={[[-410, -200], [400, -200]]}
                lineWidth={4}
                stroke={DEEP_BLUE}
            />
            <Txt
                text="Hooke's Law: F = -kΔx"
                fill={DEEP_BLUE}
                y={-300}
                fontFamily={'Montserrat'}
                fontWeight={700}
            />
        </>
    );

    // 3. CHAPTER 2: THE SPRING & MASS
    // A function to generate zig-zag points for the spring
    const getSpringPoints = () => {
        const points: Vector2[] = [];
        const startX = -400;
        const currentLength = 300 + xPos();
        const segments = 12;
        points.push(new Vector2(startX, 0));
        for (let i = 0; i < segments; i++) {
            const x = startX + (currentLength / segments) * (i + 0.5);
            const y = i % 2 === 0 ? 40 : -40;
            points.push(new Vector2(x, y));
        }
        points.push(new Vector2(startX + currentLength, 0));
        return points;
    };

    view.add(
        <>
            <Line
                ref={springRef}
                points={getSpringPoints}
                lineWidth={4}
                stroke={PURPLE}
                lineJoin={'round'}
            />
            <Rect
                ref={massRef}
                width={100}
                height={100}
                fill={DEEP_BLUE}
                x={() => -400 + 300 + xPos() + 50} // Attached to spring end
                y={0}
            />
            <Line
                points={() => [
                    [massRef().x(), 100],
                    [massRef().x() - xPos() * 1.5, 100],
                ]}
                stroke={CYAN}
                lineWidth={6}
                endArrow
            />
            <Txt
                text={() => xPos() > 0 ? "Restoring Force" : ""}
                fill={CYAN}
                x={() => massRef().x()}
                y={150}
                fontSize={24}
            />
        </>
    );

    // 4. THE ANIMATION MOTION
    yield* wall().opacity(0).opacity(1, 1);
    yield* springRef().opacity(0).opacity(1, 1);

    // Stretch the spring
    yield* xPos(250, 2);
    yield* xPos.wait(0.5);

    // Snap back (Oscillation)
    yield* all(
        xPos(-100, 0.5),
        massRef().fill(PURPLE, 0.5),
    );
    yield* xPos(0, 1);
});
