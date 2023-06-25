import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addTask, editTask } from "../store/slices/taskSlice";
import Button, { SelectBox } from "./button";
import { Formik, Form, Field } from "formik";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from "yup";
function AddTaskForm({ type, modalOpen, setModalOpen, task }) {
  const currentDate=new Date().toLocaleString().split(",")[0]
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [date,setDate]=useState(currentDate);

  useEffect(() => {
    if (type === "update" && task) {
      setTitle(task.title);
      setStatus(task.status);
      setDescription(task.description);
      setDate(task.date);
    } else {
      setTitle("");
      setDescription("");
      setDate(date);
    }
  }, [type, task, modalOpen,date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && status && description) {
      if (type === "add") {
        dispatch(
          addTask({
            id: Date.now(),
            date: date,
            title,
            description,
            status,
          })
        );
        toast.success("Task added successfully");
      }
      if (type === "update") {
        if (
          task.title !== title ||
          task.status !== status ||
          task.description !== status
        ) {
          dispatch(editTask({ ...task, title, status }));
          toast.success("Task Updated successfully");
        } else {
          toast.error("No changes made");
          return;
        }
      }
      setModalOpen(false);
    }
  };
  const AddFormSchema = Yup.object().shape({
    title: Yup.string().required("Please Enter title"),
    description: Yup.string().required("Please Enter description"),
  });
  return (
    <>
      <div>
        {modalOpen && (
          <Formik
            initialValues={{
              title: "",
              description: "",
              date:null,
            }}
            validationSchema={AddFormSchema}
          >
            {({ errors, touched }) => (
              <Form
                onSubmit={(e) => handleSubmit(e)}
                className="w-[100%]  mt-[-100px] bg-gray-200 block text-center text-2xl p-3 flex justify-center"
              >
                <div className="w-[50%] bg-gray-400 pb-[50px] rounded-md ">
                  <div className="flex justify-end m-2">
                    <MdOutlineClose
                      className="text-5xl justify-items-end"
                      onClick={() => setModalOpen(false)}
                    />
                  </div>
                  <h1 className="text-center text-4xl align-item-center mb-4 underline">
                    {type === "add" ? "Add" : "Update"} task
                  </h1>
                  <p>
                    <label htmlFor="date" className="block">Date:</label>
                    <Field name="date">
                      {({ field, form }) => (
                        <DatePicker
                          id="date"
                          {...field}
                          value={date}
                          selected={field.value}
                          onChange={(value) =>{
                            setDate(new Date(value).toLocaleString().split(",")[0])
                            form.setFieldValue(field.name, value)}
                          }
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select a date"
                        />
                      )}
                    </Field>
                    {errors.date && touched.date && !date ? (
                      <span className="text-red-500">*{errors.date}</span>
                    ) : null}
                  </p>
                  <p>
                    <label htmlFor="title" className="block">
                      Title :
                    </label>
                    <Field
                      name="title"
                      id="title"
                      value={title}
                      className="pt-2 m-2"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && touched.title && !title ? (
                      <span className="text-red-500">*{errors.title}</span>
                    ) : null}
                  </p>
                  <p>
                    <label htmlFor="description" className="block">
                      Description :
                    </label>
                    <Field
                      as="textarea"
                      className="pt-2 m-2"
                      name="description"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description &&
                    touched.description &&
                    !description ? (
                      <span className="text-red-500">
                        *{errors.description}
                      </span>
                    ) : null}
                  </p>
                  <p>
                    <label htmlFor="type" className="block">
                      Status :
                    </label>
                    <SelectBox
                      id="type"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="To Do">To do</option>
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Testing">Testing</option>
                    </SelectBox>
                  </p>
                  <p className="mt-[10px]">
                    <span>
                      <Button type="submit" variant="primary">
                        {type === "add" ? "Add Task" : "Update Task"}
                      </Button>
                    </span>
                    <span className="ml-3">
                      <Button
                        variant="secondary"
                        onClick={() => setModalOpen(false)}
                      >
                        Cancel
                      </Button>
                    </span>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>
  );
}

export default AddTaskForm;
