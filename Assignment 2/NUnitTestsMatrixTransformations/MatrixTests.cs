using MatrixTransformations;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;

namespace NUnitTestsMatrixTransformations
{
    public class MatrixTests
    {
        [TestCase(0, 0, 0, 0)]
        [TestCase(5, 4, 3, 2)]
        [TestCase(-5, 8, 100, -33)]
        public void Test_Matrix_Constructor(int m11, int m12, int m21, int m22)
        {
            // Arrange
            Matrix matrix = new Matrix(m11, m12, m21, m22);

            // Act


            // Assert
            Assert.AreEqual(m11, matrix.mat[0, 0]);
            Assert.AreEqual(m12, matrix.mat[0, 1]);
            Assert.AreEqual(m21, matrix.mat[1, 0]);
            Assert.AreEqual(m22, matrix.mat[1, 1]);
        }

        [TestCase(0, 0, 0)]
        [TestCase(5, 4, 3)]
        [TestCase(-5, 8, 100)]
        public void Test_Matrix_Constructor_Vector(int x, int y, int z)
        {
            // Arrange
            Matrix matrix = new Matrix(new Vector(x, y, z));

            // Act


            // Assert
            Assert.AreEqual(x, matrix.mat[0, 0]);
            Assert.AreEqual(y, matrix.mat[1, 0]);
            Assert.AreEqual(z, matrix.mat[2, 0]);
        }

        [TestCase(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)]
        [TestCase(5, 4, 3, 2, 5, 4, 3, 2, 10, 8, 6, 4)]
        [TestCase(-5, 32, 88, 99, -15, -16, 34, 46, -20, 16, 122, 145)]
        public void Test_Matrix_Plus_Matrix(int m11, int m12, int m21, int m22, 
            int secondm11, int secondm12, int secondm21, int secondm22, 
            int expectedm11, int expectedm12, int expectedm21, int expectedm22)
        {
            // Arrange
            Matrix matrix = new Matrix(m11, m12, m21, m22);
            Matrix matrix2 = new Matrix(secondm11, secondm12, secondm21, secondm22);

            // Act
            Matrix result = matrix + matrix2;

            // Assert
            Assert.AreEqual(expectedm11, result.mat[0, 0]);
            Assert.AreEqual(expectedm12, result.mat[0, 1]);
            Assert.AreEqual(expectedm21, result.mat[1, 0]);
            Assert.AreEqual(expectedm22, result.mat[1, 1]);
        }

        [TestCase(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)]
        [TestCase(5, 4, 3, 2, 10, 8, 6, 4, -5, -4, -3, -2)]
        [TestCase(-5, 32, 88, 99, -15, -16, 34, 46, 10, 48, 54, 53)]
        public void Test_Matrix_Minus_Matrix(int m11, int m12, int m21, int m22, 
            int secondm11, int secondm12, int secondm21, int secondm22,
            int expectedm11, int expectedm12, int expectedm21, int expectedm22)
        {
            // Arrange
            Matrix matrix = new Matrix(m11, m12, m21, m22);
            Matrix matrix2 = new Matrix(secondm11, secondm12, secondm21, secondm22);

            // Act
            Matrix result = matrix - matrix2;

            // Assert
            Assert.AreEqual(expectedm11, result.mat[0, 0]);
            Assert.AreEqual(expectedm12, result.mat[0, 1]);
            Assert.AreEqual(expectedm21, result.mat[1, 0]);
            Assert.AreEqual(expectedm22, result.mat[1, 1]);
        }

        [TestCase(1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2)]
        [TestCase(10, 25, 59, 12, 12, 49, 29, 16, 845, 890, 1056, 3083)]
        [TestCase(-12, -45, -67, -12, 5, -1, -65, 18, 2865, -798, 445, -149)]
        public void Test_Matrix_Multiplication_Matrix(int m11, int m12, int m21, int m22, int secondm11, int secondm12, int secondm21, int secondm22, int expectedm11, int expectedm12, int expectedm21, int expectedm22)
        {
            // Arrange
            Matrix m1 = new Matrix(m11, m12, m21, m22);
            Matrix m2 = new Matrix(secondm11, secondm12, secondm21, secondm22);

            Matrix expected = new Matrix(expectedm11, expectedm12, expectedm21, expectedm22);

            // Act
            Matrix actual = m1 * m2;

            // Assert
            Assert.AreEqual(expected.ToString(), actual.ToString());
        }

        [TestCase(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)]
        [TestCase(5, 4, 3, 2,             10, 8, 6, 4,              82, 46, 6, 4)]
        [TestCase(-5, 32, 88, 99,        -15, -16, 34, 46,          -437, -2904, 34, 46)]
        public void Test_Matrix_Times_Vector(int m11, int m12, int m21, int m22, 
            int x, int y, int z, int w, 
            int expectedX, int expectedY, int expectedZ, int expectedW)
        {
            // Arrange
            Matrix matrix = new Matrix(m11, m12, m21, m22);
            Vector vector = new Vector(x, y, z, w);

            // Act
            Vector result = matrix * vector;

            // Assert
            Assert.AreEqual(expectedX, result.x);
            Assert.AreEqual(expectedY, result.y);
            Assert.AreEqual(expectedZ, result.z);
            Assert.AreEqual(expectedW, result.w);
        }

        [TestCase(1, 1, 1, 1, 1, 1, 1, 1, 1)]
        [TestCase(5, 10, 12, 50, 2, 10, 20, 24, 100)]
        [TestCase(560, 301, 123, 502, 5, 2800, 1505, 615, 2510)]
        public void Test_Matrix_Multiplication_Float(int m11, int m12, int m21, int m22, float multi, int expectedm11, int expectedm12, int expectedm21, int expectedm22)
        {
            // Arrange
            Matrix m1 = new Matrix(m11, m12, m21, m22);

            Matrix expected = new Matrix(expectedm11, expectedm12, expectedm21, expectedm22);
            expected.mat[2, 2] = 1 * multi;
            expected.mat[3, 3] = 1 * multi;

            // Act
            Matrix actual = m1 * multi;

            // Assert
            Assert.AreEqual(expected.ToString(), actual.ToString());
        }

        [TestCase(1, 0.9998477f, -0.0174524058f, 0.0174524058f, 0.9998477f)]
        [TestCase(45, 0.707106769f, -0.707106769f, 0.707106769f, 0.707106769f)]
        public void Test_Matrix_RotateMatrixZ(float degrees, float expectedm11, float expectedm12, float expectedm21,
            float expectedm22)
        {
            // Arrange
            Matrix expected = new Matrix(expectedm11, expectedm12, expectedm21, expectedm22);
            Matrix actual = Matrix.RotateMatrixZ(degrees);

            // Act


            // Assert
            Assert.AreEqual(expected.ToString(), actual.ToString());
        }

        [TestCase(1, 0.9998477f, -0.0174524058f, 0.0174524058f, 0.9998477f)]
        [TestCase(45, 0.707106769f, -0.707106769f, 0.707106769f, 0.707106769f)]
        public void Test_Matrix_RotateMatrixX(float degrees, float expectedm22, float expectedm23, float expectedm32,
            float expectedm33)
        {
            // Arrange
            Matrix expected = new Matrix();
            expected.mat[1, 1] = expectedm22;
            expected.mat[1, 2] = expectedm23;
            expected.mat[2, 1] = expectedm32;
            expected.mat[2, 2] = expectedm33;


            Matrix actual = Matrix.RotateMatrixX(degrees);

            // Act


            // Assert
            Assert.AreEqual(expected.ToString(), actual.ToString());
        }

        [TestCase(1, 0.9998477f, 0.0174524058f, -0.0174524058f, 0.9998477f)]
        [TestCase(45, 0.707106769f, 0.707106769f, -0.707106769f, 0.707106769f)]
        public void Test_Matrix_RotateMatrixY(float degrees, float expectedm11, float expectedm13, float expectedm31,
            float expectedm33)
        {
            // Arrange
            Matrix expected = new Matrix();
            expected.mat[0, 0] = expectedm11;
            expected.mat[0, 2] = expectedm13;
            expected.mat[2, 0] = expectedm31;
            expected.mat[2, 2] = expectedm33;


            Matrix actual = Matrix.RotateMatrixY(degrees);

            // Act


            // Assert
            Assert.AreEqual(expected.ToString(), actual.ToString());
        }
        
        [TestCase(0, 0, 0)]
        [TestCase(5, 4, 3)]
        [TestCase(-5, 32, 88)]
        [TestCase(20, 66, 99)]
        [TestCase(-20, -300, -500)]
        [TestCase(500, 123456, -8834343)]
        public void Test_ViewMatrix(float r, float theta, float phi)
        {
            // Arrange
            Matrix matrix = Matrix.ViewMatrix(r, theta, phi);

            // Act
            float radiansTheta = theta * (float)Math.PI / 180;
            float radiansPhi = phi * (float)Math.PI / 180;

            float cosThetha = (float)Math.Cos(radiansTheta);
            float sinThetha = (float)Math.Sin(radiansTheta);

            float cosPhi = (float)Math.Cos(radiansPhi);
            float sinPhi = (float)Math.Sin(radiansPhi);

            // Assert
            Assert.AreEqual(-sinThetha, matrix.mat[0,0]);
            Assert.AreEqual(cosThetha, matrix.mat[0,1]);

            Assert.AreEqual(-cosThetha * cosPhi, matrix.mat[1,0]);
            Assert.AreEqual(-cosPhi * sinThetha, matrix.mat[1,1]);
            Assert.AreEqual(sinPhi, matrix.mat[1,2]);

            Assert.AreEqual(cosThetha * sinPhi, matrix.mat[2,0]);
            Assert.AreEqual(sinThetha * sinPhi, matrix.mat[2,1]);
            Assert.AreEqual(cosPhi, matrix.mat[2,2]);
            Assert.AreEqual(-r, matrix.mat[2,3]);
        }
    }
}
