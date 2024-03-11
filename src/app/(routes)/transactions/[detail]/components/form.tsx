"use client";
import { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
interface ITransaction {
  sender: null | number;
  receiver: null | number;
  invoiceNumber: string;
  price: number | null;
  priceComment: string;
}
const Form = () => {
  const [transaction, setTransaction] = useState<ITransaction>({
    sender: null,
    receiver: null,
    invoiceNumber: "",
    price: null,
    priceComment: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const schema = Yup.object().shape({
    sender: Yup.number().required("Sender is required"),
    receiver: Yup.number().required("Receiver is required"),
    invoiceNumber: Yup.string().required("Invoice number is required"),
    price: Yup.number().required("Price is required"),
    priceComment: Yup.string().required("Price comment is required"),
  });

  const invoiceNumbers = [
    {
      id: 1,
      name: "1111 1111 2222 3333",
    },
    {
      id: 2,
      name: "2222 4344 2222 4444",
    },
    {
      id: 3,
      name: "5455 3332 1112 4443",
    },
  ];
  function validateField(key: string, value: string | number) {
    schema
      .validateAt(key, { [key]: value })
      .then(() => {
        console.log("Validate Success", key);
        setErrors({
          ...errors,
          [key]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [key]: err.message,
        });
      });
  }
  async function onSubmit() {
    try {
      await schema.validate(transaction, { abortEarly: false });
      console.log("Success", transaction);
    } catch (error: any) {
      const newErrors: { [key: string]: string } = {};
      (error.inner || []).forEach((err: Yup.ValidationError) => {
        if (err.path) {
          newErrors[err.path] = err.message;
        }
      });
      setErrors(newErrors);
    }
    console.log("Errors", errors);
  }
  return (
    <div className="max-w-[1107px] w-full bg-white mt-10 rounded-md px-20 py-2">
      <div className="max-w-[645px] w-full flex flex-col mt-5">
        <h4 className="font-['Manrope', sans-serif] text-xs font-semibold leading-[18px] tracking-tighter">
          Отправитель
        </h4>
        <div className="grid grid-cols-6 mt-2 items-center">
          <h4 className="col-span-2 font-['Manrope', sans-serif] text-xs font-semibold leading-[18px] tracking-tighter text-left text-gray-500">
            Валюта, счет
          </h4>
          <div className="col-span-4">
            <select
              className={
                "text-xs bg-gray-100 max-w-[435px] w-full h-10 py-2 border outline-none rounded-[5px]" +
                (errors.sender
                  ? " border-red-400 text-red-400"
                  : " border-gray-400")
              }
              value={transaction.sender ?? ""}
              onBlur={(val) =>
                validateField("sender", val.target.value ?? null)
              }
              onChange={(val) => {
                setTransaction({
                  ...transaction,
                  sender: Number(val.target.value) ?? null,
                });
                validateField("sender", val.target.value ?? null);
              }}
            >
              <option value={undefined} hidden={!transaction.sender}>
                -- Select an option --
              </option>
              {invoiceNumbers.map((num, ind) => (
                <option
                  key={ind}
                  value={num.id}
                  className="ml-2 font-['Manrope', sans-serif] text-xs font-semibold leading-[18px] tracking-tighter text-left text-gray-700"
                >
                  {num.name}
                </option>
              ))}
            </select>
            <div className="font-medium text-red-500 text-xs mt-1 ml-1">
              {errors.sender}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 max-w-[645px] w-full flex flex-col">
        <h4 className="font-['Manrope', sans-serif] text-xs font-semibold leading-[18px] tracking-tighter text-left text-gray-700">
          Получатель
        </h4>
        <div className="grid grid-cols-6 mt-2 items-center">
          <h4 className="col-span-2 font-['Manrope', sans-serif] text-xs font-semibold leading-[18px] tracking-tighter text-left text-gray-500">
            МФО банка
          </h4>
          <div className="col-span-4">
            <select
              value={transaction.receiver || ""}
              onBlur={(val) => validateField("receiver", val.target.value)}
              onChange={(val) => {
                setTransaction({
                  ...transaction,
                  receiver: Number(val.target.value),
                });
                validateField("receiver", val.target.value);
              }}
              className={
                "text-xs bg-gray-100 max-w-[435px] w-full h-10 py-2 border outline-none rounded-[5px]" +
                (errors.receiver
                  ? " border-red-400 text-red-400"
                  : " border-gray-400")
              }
            >
              <option value={undefined} hidden={!transaction.receiver}>
                -- Select an option --
              </option>
              {invoiceNumbers.map((num, ind) => (
                <option
                  key={ind}
                  value={num.id}
                  className="ml-2 font-['Manrope', sans-serif] text-xs font-semibold leading-[18px] tracking-tighter text-left text-gray-700"
                >
                  {num.name}
                </option>
              ))}
            </select>
            <div className="font-medium text-red-500 text-xs mt-1 ml-1">
              {errors.receiver}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 mt-2 items-center">
          <h4 className="col-span-2 font-['Manrope', sans-serif] text-xs font-semibold leading-[18px] tracking-tighter text-left text-gray-500">
            Расчетный счет
          </h4>
          <div className="col-span-4">
            <input
              value={transaction.invoiceNumber}
              type="text"
              placeholder="0000 0000 0000 0000"
              className={
                "max-w-[435px] w-full h-10 pl-2 bg-gray-200 rounded-md focus:outline-none" +
                (errors.invoiceNumber ? " border border-red-400" : "")
              }
              onBlur={(val) => validateField("invoiceNumber", val.target.value)}
              onChange={(val) => {
                setTransaction({
                  ...transaction,
                  invoiceNumber: val.target.value,
                });
                validateField("invoiceNumber", val.target.value);
              }}
            />
            <div className="font-medium text-red-500 text-xs mt-1 ml-1">
              {errors.invoiceNumber}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 max-w-[645px] w-full">
        <h4 className="font-['Manrope', sans-serif] text-xs font-semibold leading-[18px] tracking-tighter text-left text-gray-700">
          Описание платежа
        </h4>
        <div className="grid grid-cols-6 mt-2 items-center">
          <h4 className="col-span-2 font-['Manrope', sans-serif] text-xs font-semibold leading-[18px] tracking-tighter text-left text-gray-500">
            Сумма
          </h4>
          <div className="col-span-4">
            <input
              value={transaction.price ?? ""}
              type="number"
              placeholder="00.00 UZS"
              className={
                (errors.price ? "border border-red-400 " : "") +
                "focus:outline-none max-w-[435px] w-full h-10 pl-2 bg-gray-200 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              }
              onBlur={(val) => validateField("price", val.target.value)}
              onChange={(val) => {
                setTransaction({
                  ...transaction,
                  price: val.target.value ? Number(val.target.value) : null,
                });
                validateField("price", val.target.value);
              }}
            />
            <div className="font-medium text-red-500 text-xs mt-1 ml-1">
              {errors.price}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 mt-2 items-center">
          <h4 className="col-span-2 font-['Manrope', sans-serif] text-xs font-semibold leading-[18px] tracking-tighter text-left text-gray-500">
            Назначение платежа
          </h4>
          <div className="col-span-4">
            <input
              value={transaction.priceComment}
              type="text"
              name=""
              id="coment"
              placeholder="Оплата таможенной пошлины"
              className={(errors.priceComment ? "border border-red-400 " : "") + "focus:outline-none max-w-[435px] w-full h-10 pl-2 bg-gray-200 rounded-md"}
              onBlur={(val) => validateField("priceComment", val.target.value)}
              onChange={(val) => {
                setTransaction({
                  ...transaction,
                  priceComment: val.target.value,
                });
                validateField("priceComment", val.target.value);
              }}
            />
            <div className="font-medium text-red-500 text-xs mt-1 ml-1">
              {errors.priceComment}
            </div>
          </div>
        </div>
        <button
          onClick={onSubmit}
          className="mt-8 float-right max-w-[264px] w-full h-10 border outline-[0] cursor-pointer bg-[#580158] text-white rounded-sm text-sm text-center"
        >
          Далее
        </button>
      </div>
    </div>
  );
};

export default Form;
