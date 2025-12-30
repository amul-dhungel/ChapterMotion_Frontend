from manim import *
import numpy as np

class AppleFall(Scene):
    def construct(self):
        # 1. SETTING THE STAGE (Drawing the environment first)
        ground = Line(LEFT * 5, RIGHT * 5).to_edge(DOWN, buff=1)
        
        # Simple Tree Construction
        trunk = Rectangle(width=0.5, height=3, fill_opacity=1, color="#8B4513").next_to(ground, UP, buff=0)
        leaves = Circle(radius=1.5, fill_opacity=1, color="#2E7D32").move_to(trunk.get_top() + UP * 0.8)
        tree = VGroup(trunk, leaves)

        # The Apple
        apple = Dot(color=RED, radius=0.2)
        apple.move_to(leaves.get_center() + DOWN * 0.5)

        # Animation: Drawing the scene
        self.play(Create(ground))
        self.play(Create(tree))
        self.play(FadeIn(apple, scale=0.5))
        self.wait(1)

        # 2. DATA DASHBOARD - Simplified without LaTeX
        # Static labels that show the concept
        v_label = MarkupText("Velocity: Increasing ↓", font_size=24, color=BLUE).to_corner(UR, buff=1)
        h_label = MarkupText("Height: Decreasing ↓", font_size=24, color=GREEN).next_to(v_label, DOWN, buff=0.5)

        self.play(Write(v_label), Write(h_label))

        # 3. GRAVITY ARROW
        force_arrow = Arrow(apple.get_center(), apple.get_center() + DOWN * 1, color=YELLOW)
        force_text = MarkupText("Gravity (g)", font_size=20).next_to(force_arrow, RIGHT)

        self.play(GrowArrow(force_arrow), Write(force_text))
        self.wait(1)

        # 4. THE FALL ANIMATION
        # Calculating time to hit ground: t = sqrt(2h/g) approx 0.9s
        fall_duration = 0.9

        # Move the apple
        self.play(
            apple.animate.move_to(ground.get_center() + UP * 0.2),
            run_time=fall_duration,
            rate_func=rate_functions.ease_in_quad # Mimics acceleration
        )

        # Remove the force arrow upon impact
        self.play(FadeOut(force_arrow), FadeOut(force_text))
        self.play(Indicate(apple))
        
        # Final message
        conclusion = MarkupText("Newton's Law of Gravity!", font_size=32, weight=BOLD, color=YELLOW)
        conclusion.to_edge(DOWN, buff=1.5)
        self.play(Write(conclusion))
        
        self.wait(2)
