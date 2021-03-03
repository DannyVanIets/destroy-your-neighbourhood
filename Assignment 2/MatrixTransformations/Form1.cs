using MatrixTransformations.lecture_4;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;

namespace MatrixTransformations
{
    public partial class Form1 : Form
    {
        // Axes
        AxisX x_axis;
        AxisY y_axis;
        AxisZ z_axis; // TODO: does not work yet.

        // Objects
        Cube cube;

        // Window dimensions
        const int WIDTH = 800;
        const int HEIGHT = 600;

        private static Variables variables = new Variables();

        public Form1()
        {
            InitializeComponent();

            this.Width = WIDTH;
            this.Height = HEIGHT;
            this.DoubleBuffered = true;

            // Define axes
            x_axis = new AxisX(200);
            y_axis = new AxisY(200);
            z_axis = new AxisZ(200); // TODO: does not work yet.

            // Create object
            cube = new Cube(Color.Purple);
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            base.OnPaint(e);

            List<Vector> vb;

            // Update the labels.
            labelR.Text = variables.r.ToString();
            labelDistance.Text = variables.distance.ToString();
            labelPhi.Text = variables.phi.ToString();
            labelTheta.Text = variables.theta.ToString();

            // Draw axes
            vb = ViewportTransformation(x_axis.vb);
            x_axis.Draw(e.Graphics, vb);
            vb = ViewportTransformation(y_axis.vb);
            y_axis.Draw(e.Graphics, vb);
            vb = ViewportTransformation(z_axis.vb);
            z_axis.Draw(e.Graphics, vb);  // TODO: does not work yet.

            // Scale the cube.
            List<Vector> scaled = Transform(cube.vertexbuffer, Matrix.ScaleMatrix((float)variables.scale));

            // Translation should always be last.
            // Draw cube.
            vb = ViewingPipeline(scaled);
            cube.Draw(e.Graphics, vb);
        }

        public static List<Vector> Transform(List<Vector> vb, Matrix transformmatrix)
        {
            List<Vector> result = new List<Vector>();

            vb.ForEach(x => result.Add(transformmatrix * x));

            return result;
        }

        public static List<Vector> ViewportTransformation(List<Vector> vb)
        {
            List<Vector> result = new List<Vector>();

            float delta_x = WIDTH / 2;
            float delta_y = HEIGHT / 2;

            foreach (Vector v in vb)
            {
                Vector v2 = new Vector(v.x + delta_x, delta_y - v.y);
                result.Add(v2);
            }

            return result;
        }

        public static List<Vector> ViewingPipeline(List<Vector> vb)
        {
            List<Vector> result = new List<Vector>();
            Form1 form = new Form1();
            Matrix viewMatrix = Matrix.ViewMatrix(variables.r, variables.theta, variables.phi);

            vb.ForEach(v =>
            {
                Vector vp = viewMatrix * v;
                vp = Matrix.ProjectionMatrix(variables.distance, vp) * vp;
                result.Add(vp);
            });

            return ViewportTransformation(result);
        }

        public static void Reset()
        {
            variables = new Variables();
        }

        public void UpdateLabels()
        {
            labelScale.Text = variables.scale.ToString();

            labelTranslateX.Text = variables.translateX.ToString();
            labelTranslateY.Text = variables.translateY.ToString();
            labelTranslateZ.Text = variables.translateZ.ToString();

            labelRotateX.Text = variables.rotateX.ToString();
            labelRotateY.Text = variables.rotateY.ToString();
            labelRotateZ.Text = variables.rotateZ.ToString();

            labelR.Text = variables.r.ToString();
            labelDistance.Text = variables.distance.ToString();
            labelPhi.Text = variables.phi.ToString();
            labelTheta.Text = variables.theta.ToString();

            labelPhase.Text = "Phase 0";
        }

        private void Form1_KeyDown(object sender, KeyEventArgs e)
        {
            switch (e.KeyCode)
            {
                case Keys.Escape:
                    Application.Exit();
                    break;

                case Keys.A:
                    // Animation time! Hooray.
                    variables.scale += 0.01;
                    labelScale.Text = variables.scale.ToString();
                    labelPhase.Text = "Phase 1";
                    break;

                // Reset all variables to default.
                case Keys.C:
                    Reset();
                    UpdateLabels();
                    break;

                // Change scale.
                case Keys.S when e.Shift:
                    variables.scale++;
                    labelScale.Text = variables.scale.ToString();
                    break;

                case Keys.S:
                    variables.scale--;
                    labelScale.Text = variables.scale.ToString();
                    break;

                // Change translateX.
                case Keys.Left:
                    variables.translateX -= 0.1;
                    labelTranslateX.Text = variables.translateX.ToString();
                    break;

                case Keys.Right:
                    variables.translateX += 0.1;
                    labelTranslateX.Text = variables.translateX.ToString();
                    break;

                // Change translateY.
                case Keys.Up:
                    variables.translateY -= 0.1;
                    labelTranslateY.Text = variables.translateY.ToString();
                    break;

                case Keys.Down:
                    variables.translateY += 0.1;
                    labelTranslateY.Text = variables.translateY.ToString();
                    break;

                // Change translateZ.
                case Keys.PageUp:
                    variables.translateZ -= 0.1;
                    labelTranslateZ.Text = variables.translateZ.ToString();
                    break;

                case Keys.PageDown:
                    variables.translateZ += 0.1;
                    labelTranslateZ.Text = variables.translateZ.ToString();
                    break;

                // Change RotateX
                case Keys.X when e.Shift:
                    variables.rotateX++;
                    labelRotateX.Text = variables.rotateX.ToString();
                    break;

                case Keys.X:
                    variables.rotateX--;
                    labelRotateX.Text = variables.rotateX.ToString();
                    break;

                // Change RotateY
                case Keys.Y when e.Shift:
                    variables.rotateY++;
                    labelRotateY.Text = variables.rotateY.ToString();
                    break;

                case Keys.Y:
                    variables.rotateY--;
                    labelRotateY.Text = variables.rotateY.ToString();
                    break;

                // Change RotateZ
                case Keys.Z when e.Shift:
                    variables.rotateZ++;
                    labelRotateZ.Text = variables.rotateZ.ToString();
                    break;

                case Keys.Z:
                    variables.rotateZ--;
                    labelRotateZ.Text = variables.rotateZ.ToString();
                    break;

                // Change r
                case Keys.R when e.Shift:
                    variables.r++;
                    labelR.Text = variables.r.ToString();
                    break;

                case Keys.R:
                    variables.r--;
                    labelR.Text = variables.r.ToString();
                    break;

                // Change distance
                case Keys.D when e.Shift:
                    variables.distance++;
                    labelDistance.Text = variables.distance.ToString();
                    break;

                case Keys.D:
                    variables.distance--;
                    labelDistance.Text = variables.distance.ToString();
                    break;

                // Change phi
                case Keys.P when e.Shift:
                    variables.phi++;
                    labelPhi.Text = variables.phi.ToString();
                    break;

                case Keys.P:
                    variables.phi--;
                    labelPhi.Text = variables.phi.ToString();
                    break;

                // Change theta
                case Keys.T when e.Shift:
                    variables.theta++;
                    labelTheta.Text = variables.theta.ToString();
                    break;

                case Keys.T:
                    variables.theta--;
                    labelTheta.Text = variables.theta.ToString();
                    break;
            }
        }
    }
}