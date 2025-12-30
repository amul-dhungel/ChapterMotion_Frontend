from manim import *

class HumanEvolution(Scene):
    def construct(self):
        # --- THEME SETTINGS ---
        self.camera.background_color = "#FDF5E6"  # Creamy Background
        logo_gradient = ["#003366", "#4A00E0", "#00D2FF"] # Blue -> Purple -> Cyan
        primary_blue = "#003366"
        accent_purple = "#4A00E0"

        # --- INTRODUCTION ---
        title = MarkupText("Chapter Motion: Human Evolution", color=primary_blue, font_size=48)
        subtitle = MarkupText("A Journey Through Time", font_size=24, color=accent_purple).next_to(title, DOWN)
        
        self.play(Write(title), FadeIn(subtitle, shift=UP))
        self.wait(1)
        self.play(FadeOut(subtitle))

        # --- TIMELINE AXIS ---
        timeline = NumberLine(
            x_range=[0, 7, 1], # 7 Million years ago to today
            length=10,
            color=primary_blue,
            include_numbers=False,
            label_direction=DOWN
        ).shift(DOWN * 2)
        
        time_label = MarkupText("Millions of Years Ago", font_size=18, color=primary_blue).next_to(timeline, DOWN)
        today_label = MarkupText("Today", font_size=16, color=primary_blue).move_to(timeline.get_end() + DOWN * 0.4)
        past_label = MarkupText("7 Ma", font_size=16, color=primary_blue).move_to(timeline.get_start() + DOWN * 0.4)

        self.play(Create(timeline), Write(time_label), Write(today_label), Write(past_label))

        # --- EVOLUTION STAGES (Abstracted as Shapes/Silhouettes) ---
        # We represent the change in posture and brain size (height and circle size)
        
        stages_data = [
            {"name": "Sahelanthropus", "time": 0, "height": 1.2, "brain": 0.2},
            {"name": "Australopithecus", "time": 2.5, "height": 1.5, "brain": 0.3},
            {"name": "Homo erectus", "time": 4.5, "height": 1.8, "brain": 0.5},
            {"name": "Homo sapiens", "time": 6.8, "height": 2.1, "brain": 0.7},
        ]

        evolution_group = VGroup()
        
        for data in stages_data:
            # Create a simple "humanoid" silhouette using a circle (head) and line (body)
            pos = timeline.number_to_point(data["time"]) + UP * 0.2
            
            body = Line(pos, pos + UP * data["height"], color=primary_blue, stroke_width=6)
            head = Circle(radius=data["brain"], color=accent_purple, fill_opacity=0.8).move_to(body.get_top() + UP * data["brain"])
            
            # Applying gradient to the "stage"
            stage = VGroup(body, head)
            stage.set_color_by_gradient(*logo_gradient)
            
            label = MarkupText(data["name"], font_size=18, color=primary_blue).next_to(stage, UP)
            
            self.play(
                Create(body), 
                GrowFromCenter(head), 
                Write(label),
                run_time=1
            )
            evolution_group.add(stage, label)
            self.wait(0.5)

        # --- HIGHLIGHTING THE BRAIN EXPANSION ---
        highlight_box = SurroundingRectangle(evolution_group[-2:], color="#00D2FF", buff=0.2)
        brain_text = MarkupText("Rapid Brain Growth", font_size=24).set_color_by_gradient(*logo_gradient).next_to(highlight_box, UP, buff=0.5)
        
        self.play(Create(highlight_box), Write(brain_text))
        self.play(Indicate(evolution_group[-2])) # Indicate Sapiens head
        
        self.wait(2)
        
        # --- CONCLUSION ---
        conclusion = MarkupText(
            "Evolution is a continuous motion.", 
            font_size=32, weight=BOLD
        ).set_color_by_gradient(*logo_gradient).to_edge(DOWN, buff=1)

        self.play(Write(conclusion))
        self.wait(3)
