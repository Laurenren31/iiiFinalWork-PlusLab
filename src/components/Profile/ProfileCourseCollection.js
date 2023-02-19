import React from "react";
import { Link } from "react-router-dom";

const ProfileCourseCollection = () => {
  return (
    <div className="profileCourseCollection">
      <table>
        <tbody>
          <tr>
            <td>
              <Link to="/profile">
                <h2>自選股</h2>
              </Link>
            </td>
            <td></td>
            <td>
              <Link to="/profile/ownCourse">
                <h2>已購買的課程</h2>
              </Link>
            </td>
            <td></td>
            <td>
              <Link to="/profile/courseCollection">
                <h2 style={{ boxShadow: "0px 4px #e23965" }}>已收藏的課程</h2>
              </Link>
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfileCourseCollection;
