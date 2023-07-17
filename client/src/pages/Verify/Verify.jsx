import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { login } from "../../store/authReducer";

const Verify = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.post(
          `http://localhost:5000/api/verifyEmail/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(res);
        if (res.status === 200) {
          dispatch(login());
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyEmail();
  }, [id]);

  return <></>;
};

export default Verify;
