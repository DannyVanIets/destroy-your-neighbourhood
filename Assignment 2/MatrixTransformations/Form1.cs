using System;
using MatrixTransformations.lecture_4;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;

namespace MatrixTransformations
{
    public partial class Form1 : Form
    {
        //Timer
        private Timer timer = new Timer();

        // Axes
        AxisX x_axis;
        AxisY y_axis;
        AxisZ z_axis;

        // Objects
        Cube cube;

        // Window dimensions
        const int WIDTH = 800;
        const int HEIGHT = 600;

        private static Variables variables = new Variables();

        private int subphase = 0;

        private int decimalamount = 2;

        public Form1()
        {
            InitializeComponent();

            this.Width = WIDTH;
            this.Height = HEIGHT;
            this.DoubleBuffered = true;

            //Timer
            timer.Interval = 50;
            timer.Tick += Animate;

            // Define axes
            x_axis = new AxisX(200);
            y_axis = new AxisY(200);
            z_axis = new AxisZ(200);

            // Create object
            cube = new Cube(Color.Purple);
        }

        private void Animate(object sender, EventArgs e)
        {
            if (variables.phase == 1)
            {
                if (variables.scale < 1.5 && subphase == 0)
                {
                    variables.scale += 0.01f;
                }
                else if (variables.scale > 1 && subphase == 1)
                {
                    variables.scale -= 0.01f;
                }
                else if (variables.scale >= 1.5f)
                {
                    subphase = 1;
                }
                else
                {
                    subphase = 0;
                    variables.phase = 2;
                }

                variables.theta -= 1f;
            }
            else if (variables.phase == 2)
            {
                if (variables.rotateX < 45 && subphase == 0)
                {
                    variables.rotateX += 1f;
                }
                else if (variables.rotateX > 0 && subphase == 1)
                {
                    variables.rotateX -= 1f;
                }
                else if (variables.rotateX >= 45)
                {
                    subphase = 1;
                }
                else
                {
                    subphase = 0;
                    variables.phase = 3;
                }

                variables.theta -= 1;
            }
            else if (variables.phase == 3)
            {
                if (variables.rotateY < 45 && subphase == 0)
                {
                    variables.rotateY += 1f;
                }
                else if (variables.rotateY > 0 && subphase == 1)
                {
                    variables.rotateY -= 1f;
                }
                else if (variables.rotateY >= 45)
                {
                    subphase = 1;
                }
                else
                {
                    subphase = 0;
                    variables.phase = 4;
                }

                variables.phi += 1;
            }
            else if (variables.phase == 4)
            {
                bool phidone = false;

                if (variables.phi > -10)
                {
                    variables.phi -= 1;
                }
                else
                {
                    phidone = true;
                }

                if (variables.theta < -100)
                {
                    variables.theta += 1;
                }
                else if (phidone)
                {
                    variables.phase = 1;
                }
            }
            else
            {
                variables.phase = 1;
            }

            Invalidate();
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            base.OnPaint(e);

            List<Vector> vb;

            // Update the all the labels.
            UpdateLabels();

            // Draw axes.
            vb = ViewingAxis(x_axis.vb);
            x_axis.Draw(e.Graphics, vb);
            vb = ViewingAxis(y_axis.vb);
            y_axis.Draw(e.Graphics, vb);
            vb = ViewingAxis(z_axis.vb);
            z_axis.Draw(e.Graphics, vb);

            // Time for cube.
            vb = cube.vertexbuffer;

            // Scale the cube.
            Matrix scaled = Matrix.ScaleMatrix(variables.scale);

            // Rotate the cube.
            Matrix rotateX = Matrix.RotateMatrixX(variables.rotateX);
            Matrix rotateY = Matrix.RotateMatrixX(variables.rotateY);
            Matrix rotateZ = Matrix.RotateMatrixX(variables.rotateZ);

            // Translate the cube, should always be last!
            Matrix translate = Matrix.TranslateMatrix(new Vector(variables.translateX, variables.translateY, variables.translateZ, 0));

            // Multiple them all up.
            Matrix total = scaled * rotateX * rotateY * rotateZ * translate;
            vb = Transform(vb, total);

            // Draw cube.
            vb = ViewingPipeline(vb);
            cube.Draw(e.Graphics, vb);
        }

        public static List<Vector> Transform(List<Vector> vb, Matrix transformMatrix)
        {
            // Go through every vector and multiple it with the transformMatrix.
            List<Vector> result = new List<Vector>();
            vb.ForEach(x => result.Add(transformMatrix * x));
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

        public static List<Vector> ViewingAxis(List<Vector> vb)
        {
            List<Vector> result = new List<Vector>();
            Matrix viewMatrix = Matrix.ViewMatrix(variables.r, variables.theta, variables.phi);

            vb.ForEach(v =>
            {
                Vector vp = viewMatrix * v;
                result.Add(vp);
            });

            return ViewportTransformation(result);
        }

        public static List<Vector> ViewingPipeline(List<Vector> vb)
        {
            List<Vector> result = new List<Vector>();
            Matrix viewMatrix = Matrix.ViewMatrix(variables.r, variables.theta, variables.phi);

            vb.ForEach(v =>
            {
                Vector vp = viewMatrix * v;
                vp = Matrix.ProjectionMatrix(variables.distance, vp) * vp;
                result.Add(vp);
            });

            return ViewportTransformation(result);
        }

        public void UpdateLabels()
        {
            // Update every label with a number in it, after a key press or during the animation.

            labelScale.Text = Math.Round(variables.scale, decimalamount).ToString();

            labelTranslateX.Text = Math.Round(variables.translateX, decimalamount).ToString();
            labelTranslateY.Text = Math.Round(variables.translateY, decimalamount).ToString();
            labelTranslateZ.Text = Math.Round(variables.translateZ, decimalamount).ToString();

            labelRotateX.Text = Math.Round(variables.rotateX, decimalamount).ToString();
            labelRotateY.Text = Math.Round(variables.rotateY, decimalamount).ToString();
            labelRotateZ.Text = Math.Round(variables.rotateZ, decimalamount).ToString();

            labelR.Text = Math.Round(variables.r, decimalamount).ToString();
            labelDistance.Text = Math.Round(variables.distance, decimalamount).ToString();
            labelPhi.Text = Math.Round(variables.phi, decimalamount).ToString();
            labelTheta.Text = Math.Round(variables.theta, decimalamount).ToString();

            string phasetext = "";

            if (subphase > 0)
            {
                phasetext = " -";
            }

            phasetext += variables.phase;

            labelPhase.Text = $"Phase: {phasetext}";
        }

        private void Form1_KeyDown(object sender, KeyEventArgs e)
        {
            // In this function we have switch cases for keypresses.
            // Once a button is pressed, the cube will be redrawn and the labels will be updated, based on the keypress.

            switch (e.KeyCode)
            {
                case Keys.Escape:
                    Application.Exit();
                    break;

                // If A is pressed, start or stop a timer for the animations.
                case Keys.A when timer.Enabled:
                    timer.Stop();
                    break;

                case Keys.A:
                    timer.Start();
                    break;

                // If C is pressed, reset all variables to default, stop the animation and reset the labels as well.
                case Keys.C:
                    timer.Stop();
                    variables = new Variables();
                    break;

                // If S/s is pressed, change scale of the cube.
                case Keys.S when e.Shift:
                    variables.scale += 0.1f;
                    break;

                case Keys.S:
                    variables.scale -= 0.1f;
                    break;

                // If arrows left/right are pressed, change translateX.
                case Keys.Right:
                    variables.translateX += 0.1f;
                    break;

                case Keys.Left:
                    variables.translateX -= 0.1f;
                    break;

                // If arrows down/up are pressed, change translateY.
                case Keys.Up:
                    variables.translateY += 0.1f;
                    break;

                case Keys.Down:
                    variables.translateY -= 0.1f;
                    break;

                // If arrows PageDown/PageUp are pressed, change translateZ.
                case Keys.PageUp:
                    variables.translateZ += 0.1f;
                    break;

                case Keys.PageDown:
                    variables.translateZ -= 0.1f;
                    break;

                // If X/x is pressed, change RotateX.
                case Keys.X when e.Shift:
                    variables.rotateX += 0.1f;
                    break;

                case Keys.X:
                    variables.rotateX -= 0.1f;
                    break;

                // If Y/y is pressed, change RotateY.
                case Keys.Y when e.Shift:
                    variables.rotateY += 0.1f;
                    break;

                case Keys.Y:
                    variables.rotateY -= 0.1f;
                    break;

                // If Z/z is pressed, change RotateZ.
                case Keys.Z when e.Shift:
                    variables.rotateZ += 0.1f;
                    break;

                case Keys.Z:
                    variables.rotateZ -= 0.1f;
                    break;

                // If R/r is pressed, change r.
                case Keys.R when e.Shift:
                    variables.r += 0.1f;
                    break;

                case Keys.R:
                    variables.r -= 0.1f;
                    break;

                // If D/d is pressed, change distance.
                case Keys.D when e.Shift:
                    variables.distance += 10f;
                    break;

                case Keys.D:
                    variables.distance -= 10f;
                    break;

                // If P/p is pressed, change phi.
                case Keys.P when e.Shift:
                    variables.phi += 1f;
                    break;

                case Keys.P:
                    variables.phi -= 1f;
                    break;

                // If T/t is pressed, change theta.
                case Keys.T when e.Shift:
                    variables.theta += 1f;
                    break;

                case Keys.T:
                    variables.theta -= 1f;
                    break;
            }
            Invalidate();
        }
    }
}