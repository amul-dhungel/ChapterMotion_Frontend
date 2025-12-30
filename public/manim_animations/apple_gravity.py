from manim import *
import numpy as np

class AppleGravity(Scene):
    def construct(self):
        # --- THEME SETTINGS ---
        self.camera.background_color = "#FDF5E6"  # Creamy Background
        logo_gradient = ["#003366", "#4A00E0", "#00D2FF"] # Blue -> Purple -> Cyan
        primary_blue = "#003366"
        accent_purple = "#4A00E0"
        
        # --- 1. ENVIRONMENT SETUP ---
        ground = Line(LEFT*7, RIGHT*7, color="#228B22", stroke_width=8).shift(DOWN*3)
        
        # Simple Tree
        trunk = Rectangle(width=0.4, height=3, fill_color="#8B4513", fill_opacity=1).shift(LEFT*3 + DOWN*1.5)
        leaves = Circle(radius=1.5, color="#2E7D32", fill_opacity=0.8).move_to(trunk.get_top() + UP*0.5)
        tree = VGroup(trunk, leaves)

        # Happy Apple
        apple_body = Circle(radius=0.25, color=RED, fill_opacity=1)
        stem = Line(UP*0.25, UP*0.4, color="#8B4513", stroke_width=4)
        # Simple Face
        eye1 = Dot(radius=0.04, color=BLACK).shift(LEFT*0.08 + UP*0.05)
        eye2 = Dot(radius=0.04, color=BLACK).shift(RIGHT*0.08 + UP*0.05)
        smile = Arc(radius=0.12, start_angle=210*DEGREES, angle=120*DEGREES, color=BLACK).shift(DOWN*0.05)
        apple = VGroup(apple_body, stem, eye1, eye2, smile).move_to(leaves.get_center() + DOWN*0.5 + RIGHT*0.5)

        self.add(ground, tree, apple)

        # --- 2. DATA DASHBOARD (Top Right) - Simplified ---
        dashboard = VGroup()
        
        # Static labels
        v_label = MarkupText("Velocity: Increasing ↓", font_size=20, color="#00D2FF")
        h_label = MarkupText("Height: Decreasing ↓", font_size=20, color=accent_purple).next_to(v_label, DOWN, buff=0.3)
        
        dashboard.add(v_label, h_label).to_corner(UR, buff=0.5)
        
        # Equation Banner
        equation = MarkupText("F = m × g", font_size=24, color=primary_blue).next_to(dashboard, DOWN, buff=0.5)
        eq_box = SurroundingRectangle(equation, color=accent_purple, buff=0.2)

        self.play(FadeIn(dashboard), Write(equation), Create(eq_box))

        # --- 3. FORCE ARROW ---
        force_arrow = always_redraw(lambda:
            Arrow(apple.get_center(), apple.get_center() + DOWN*1.2, color="#00D2FF", buff=0)
        )
        force_label = MarkupText("Gravity", font_size=18, color="#00D2FF").next_to(force_arrow, RIGHT)

        self.play(GrowArrow(force_arrow), Write(force_label))
        self.wait(1)

        # --- 4. THE FALL ---
        fall_time = 0.95 
        
        # Update labels as apple falls
        self.play(
            apple.animate.shift(DOWN * 5.2),
            run_time=fall_time,
            rate_func=rate_functions.ease_in_quad # Acceleration
        )

        # Impact wiggle
        self.play(
            Wiggle(apple, scale_value=1.1, rotation_angle=0.05*TAU), 
            FadeOut(force_arrow), 
            FadeOut(force_label)
        )
        
        # Final message
        conclusion = MarkupText(
            "Gravity pulls everything down!", 
            font_size=28, 
            weight=BOLD
        ).set_color_by_gradient(*logo_gradient).to_edge(DOWN, buff=1)
        
        self.play(Write(conclusion))
        self.wait(2)
