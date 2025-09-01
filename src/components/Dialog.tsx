import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useAddColumn from "../hook/useAddColumn";
import useAddTask from "../hook/useAddTask";
import useEditTask from "../hook/useEditTask";
import useUiStore from "../store";

interface DialogProps {
  onClose: () => void;
}
interface Form {
  title: string;
}

export default function Dialog({ onClose }: DialogProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const { mode, defaultValue, colId, taskId } = useUiStore();
  const { mutate: addColumn } = useAddColumn(reset);
  const { mutate: addTask } = useAddTask(reset);
  const { mutate: editTask } = useEditTask(reset);

  const onSubmit = (data: any) => {
    if (mode === "add-column") {
      const newData = { ...data, id: new Date() };
      addColumn({ ...newData, tasks: [] });
      onClose();
    } else if (mode === "add-task") {
      const newData = { ...data, id: Math.random() };
      addTask({ colId, data: newData });
      onClose();
    } else if (mode === "edit-task") {
      editTask({ colId, taskId, newTitle: data });
      onClose();
    }
  };

  useEffect(() => {
    if (mode === "edit-task" && defaultValue) {
      reset({ title: defaultValue });
    } else {
      reset({ title: "" });
    }
  }, [mode, defaultValue]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* محتوای دیالوگ */}
      <div className="relative bg-[#333] rounded-2xl p-6 w-[400px] shadow-lg text-white">
        {/* دکمه بستن */}
        <div
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
          aria-label="بستن"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>

        <h3 className="text-lg font-semibold mb-4">
          {mode === "add-column"
            ? "افزودن ستون جدید"
            : mode === "add-task"
            ? "افزودن تسک جدید"
            : mode === "edit-task"
            ? "ویرایش تسک"
            : ""}
        </h3>

        <input
          {...register("title", {
            required: "عنوان را وارد کنید",
            setValueAs: (value) => value.trim(),
          })}
          type="text"
          dir="rtl"
          placeholder="عنوان را وارد کنید"
          className="w-full px-3 py-2 border border-slate-500 bg-[#333] text-white rounded-xl mb-4 focus:outline-none focus:ring focus:ring-blue-500"
        />
        {errors.title && <p>{errors.title.message}</p>}

        <div className="flex justify-center mt-5 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-500 text-slate-300 hover:bg-[#333]"
          >
            انصراف
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}
