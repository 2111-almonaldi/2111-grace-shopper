import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { checkoutOrder } from "../../store/order";

export default function GuestCheckout() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { order } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        dispatch(checkoutOrder(data));
      })}
    >
      <input
        {...register("customerEmail", {
          required: "This field is required",
        })}
        placeholder="Email"
      />
      <div>{errors.customerEmail?.message}</div>
      <input
        {...register("customerName", { required: "This field is required" })}
        placeholder="Name"
      />
      <div>{errors.customerName?.message}</div>
      <input
        {...register("customerAddress", {
          required: "This field is required",
        })}
        placeholder="Address Line 1"
      />
      <div>{errors.customerAddress?.message}</div>
      <input
        {...register("customerCity", { required: "This field is required" })}
        placeholder="City"
      />
      <div>{errors.customerCity?.message}</div>
      <input
        {...register("customerState", { required: "This field is required" })}
        placeholder="State"
      />
      <div>{errors.customerState?.message}</div>
      <input {...register("customerZip")} placeholder="Zip Code" />
      <input
        {...register("customerPhone", { required: false })}
        placeholder="Phone (Optional)"
      />
      <input type="submit" />
    </form>
  );
}
