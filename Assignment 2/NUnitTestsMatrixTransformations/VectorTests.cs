using MatrixTransformations;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;

namespace NUnitTestsMatrixTransformations
{
    public class VectorTests
    {
        [TestCase(0, 0)]
        [TestCase(5, 2)]
        [TestCase(-5, -10)]
        [TestCase(7, 5, 3)]
        [TestCase(15, 26, 6)]
        [TestCase(-5, -8, -3)]
        [TestCase(12, 30, 50, 8)]
        [TestCase(2, 3, 5, 9)]
        [TestCase(-23, -30, -50, -4)]
        public void Test_Vector_Constructor(int x, int y, int z = 0, int w = 0)
        {
            // Arrange
            Vector v = new Vector(x, y, z, w);

            // Act


            // Assert
            Assert.AreEqual(x, v.x);
            Assert.AreEqual(y, v.y);
            Assert.AreEqual(z, v.z);
            Assert.AreEqual(w, v.w);
        }

        [TestCase(0, 0, 0, 0,        0, 0, 0, 0,        0, 0, 0, 0)]
        [TestCase(5, 5, 0, 0,        5, 5, 0, 0,        10, 10, 0, 0)]
        [TestCase(-8, -5, 0, 0,      9, 2, 0, 0,        1, -3, 0, 0)]
        [TestCase(10, 8, 12, -13,    9, 2, -13, -13,    19, 10, -1, -26)]
        [TestCase(25, 25, 25, 25,    25, 25, 25, 25,    50, 50, 50, 50)]
        // 12 variables: x, y, z, w, secondX, secondY, secondZ, secondW, expectedX, expectedY, expectedZ, expectedW. 
        public void Test_Vector_Plus(int x, int y, int z, int w, int secondX, int secondY, int secondZ, int secondW, int expectedX, int expectedY, int expectedZ, int expectedW)
        {
            // Arrange
            Vector v1 = new Vector(x, y, z, w);
            Vector v2 = new Vector(secondX, secondY, secondZ, secondW);

            // Act
            Vector actual = v1 + v2;

            // Assert
            Assert.AreEqual(expectedX, actual.x);
            Assert.AreEqual(expectedY, actual.y);
            Assert.AreEqual(expectedZ, actual.z);
            Assert.AreEqual(expectedW, actual.w);
        }

        [TestCase(0, 0, 0, 0,            0, 0, 0, 0,        0, 0, 0, 0)]
        [TestCase(5, 5, 0, 0,            5, 5, 0, 0,        0, 0, 0, 0)]
        [TestCase(23, 15, -50, -23,      -30, 20, 53, -5,   53, -5, -103, -18)]
        [TestCase(100, 100, 100, 100,    50, 33, 25, 13,    50, 67, 75, 87)]
        // 12 variables: x, y, z, w, secondX, secondY, secondZ, secondW, expectedX, expectedY, expectedZ, expectedW. 
        public void Test_Vector_Minus(int x, int y, int z, int w, int secondX, int secondY, int secondZ, int secondW, int expectedX, int expectedY, int expectedZ, int expectedW)
        {
            // Arrange
            Vector v1 = new Vector(x, y, z, w);
            Vector v2 = new Vector(secondX, secondY, secondZ, secondW);

            // Act
            Vector actual = v1 - v2;

            // Assert
            Assert.AreEqual(expectedX, actual.x);
            Assert.AreEqual(expectedY, actual.y);
            Assert.AreEqual(expectedZ, actual.z);
            Assert.AreEqual(expectedW, actual.w);
        }

        [TestCase(0, 0, 0, 0,         0,      0, 0, 0, 0)]
        [TestCase(5, 5, 5, 5,         5,      25, 25, 25, 25)]
        [TestCase(22, 36, 48, 54,     8,      176, 288, 384, 432)]
        [TestCase(20, 54, 33, 78,     10,     200, 540, 330, 780)]
        [TestCase(13, 85, -133, -3,   -6,     -78, -510, 798, 18)]
        public void Test_Vector_Multiplied(int x, int y, int z, int w, int n, int expectedX, int expectedY, int expectedZ, int expectedW)
        {
            // Arrange
            Vector v1 = new Vector(x, y, z, w);

            // Act
            Vector actual = v1 * n;

            // Assert
            Assert.AreEqual(expectedX, actual.x);
            Assert.AreEqual(expectedY, actual.y);
            Assert.AreEqual(expectedZ, actual.z);
            Assert.AreEqual(expectedW, actual.w);
        }
    }
}
