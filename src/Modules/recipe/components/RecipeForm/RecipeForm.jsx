import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function RecipeForm() {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const params = new useParams();

  let paramId = params.recipeId;

  const onSubmit = async (data) => {
    const formdat = new FormData();
    formdat.append("name", data.name);
    formdat.append("tagId", data.tagId);
    formdat.append("price", data?.price);
    formdat.append("categoriesIds", data?.categoriesIds);
    formdat.append("description", data?.description);
    formdat.append("recipeImage", data?.recipeImage[0]);
    console.log(formdat);
    try {
       await axios.post(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/`,
        formdat,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      navigate("/dashboard/Recipe-List");
    } catch (error) {
      console.log(error);
    }
  };

  const [CategoriesList, setCategoriesList] = useState([]);
  const [tags, setTags] = useState([]);
  let getCategoriesList = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/",
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  let getTag = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/tag/",
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setTags(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategoriesList();
    getTag();

    if (paramId != "new-recipe") {
      let getRecipe = async () => {
        let response = await axios.get(
          `https://upskilling-egypt.com:3006/api/v1/Recipe/${paramId}`,
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        let recipeData = response?.data;
        setValue("categoriesIds", response.data?.category[0]?.id);
        setValue("tagId", response.data.tag.id);

        setValue("name", recipeData.name);
        setValue("description", recipeData.description);
        setValue("modificationDate", recipeData.modificationDate);
        setValue("price", recipeData.price);
      };

      getRecipe();
    }
  }, [paramId, setValue]);

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-8 recipe">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Recipe Name"
                className="form-control"
                {...register("name", { required: "* required field" })}
              />
              {errors?.name?.message && (
                <div className="mt-2 text-danger">{errors?.name?.message}</div>
              )}
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                aria-label="Default select example"
                {...register("tagId", { required: "* required field" })}
              >
                <option value="">tag</option>
                {tags.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
              {errors?.tagId?.message && (
                <div className="mt-2 text-danger">{errors?.tagId?.message}</div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="number"
                placeholder="Price "
                className="form-control"
                {...register("price", { required: "* required field" })}
              />
              {errors?.price?.message && (
                <div className="mt-2 text-danger">{errors?.price?.message}</div>
              )}
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                aria-label="Default select example"
                {...register("categoriesIds", { required: "* required field" })}
              >
                <option value="">category</option>
                {CategoriesList.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
              {errors?.categoriesIds?.message && (
                <div className="mt-2 text-danger">
                  {errors?.categoriesIds?.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="description"
                {...register("description", { required: "* required field" })}
              />
              {errors?.description?.message && (
                <div className="mt-2 text-danger">
                  {errors?.description?.message}
                </div>
              )}
            </div>
            <div className="mb-3">
              <input
                {...register("recipeImage")}
                className="form-control file"
                type="file"
              />
            </div>
            <div className="d-flex grid justify-content-end gap-4">
              <button
                to="Recipe-List"
                className="btn  px-5 btn-lg btn-outline-success"
              >
                Cancel
              </button>
              <button
                to="/Dashboard/Recipe-List"
                disabled={isSubmitting}
                className="btn  px-5 btn-lg btn-success"
              >
                {isSubmitting ? "saving........... " : "save"}
              </button>
            </div>
          </form>
        </div>{" "}
      </div>
    </>
  );
}
