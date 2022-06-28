import React, { useEffect } from "react";
import { getMovies } from "./../features/movies/movieSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { login, getAllUsers } from "./../features/users/userSlice";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const defaultValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovies());
    dispatch(getAllUsers());
  }, [dispatch]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: defaultValues,
  });
  const onSubmit = async (data) => {
    console.log(data);
    dispatch(login(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      <p>{errors.email?.message}</p>

      <input {...register("password")} />
      <p>{errors.password?.message}</p>

      <input type="submit" />
    </form>
  );
}
