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

        [TestCase(0, 0, 0)]
        [TestCase(5, 4, 3)]
        [TestCase(-5, 8, 100)]
        public void Test_Matrix_Plus(int x, int y, int z)
        {
            // Arrange
            Matrix matrix = new Matrix(new Vector(x, y, z));

            // Act


            // Assert
            Assert.AreEqual(x, matrix.mat[0, 0]);
            Assert.AreEqual(y, matrix.mat[1, 0]);
            Assert.AreEqual(z, matrix.mat[2, 0]);
        }

        [TestCase(1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2)]
        [TestCase(10, 25, 59, 12, 12, 49, 29, 16, 845, 890, 1056, 3083)]
        [TestCase(-12, -45, -67, -12, 5, -1, -65, 18, 2865, -798, 445, -149)]
        public void Test_Matrix_Multiplication(int m11, int m12, int m21, int m22, int secondm11, int secondm12, int secondm21, int secondm22, int expectedm11, int expectedm12, int expectedm21, int expectedm22)
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
    }
}
