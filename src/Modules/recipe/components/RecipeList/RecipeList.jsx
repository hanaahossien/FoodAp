import React, { useEffect, useState } from "react";
import Header from "../../../shared/components/Header/Header";
import axios from "axios";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-toastify";
import NoData from "../../../shared/components/NoData/NoData";
import { Link } from "react-router-dom";
import noimg from "../../../../assets/nodata.svg";
export default function RecipeList() {
  const [RecipesList, setRecipesList] = useState([]);
  const [recipeId, setrecipeId] = useState(0);
  const [show, setShow] = useState(false);
  const [tags, setTags] = useState([]);
  const [CategoriesList, setCategoriesList] = useState([]);
  const [nameValue, setnameValue] = useState("");
  const [Tage, setTageValue] = useState("");
  const [Category, setCategoryValue] = useState("");

  let getName = (e) => {
    setnameValue(nameValue);
    getRecipesList(e.target.value, Category, Tage);
  //  RecipesList.length == 0 ? console.log ("s") : console.log("dd")
  };
  let getTage = (e) => {
    setTageValue(e.target.value);
    getRecipesList(nameValue, e.target.value, Category);
  };
  let getCat = (e) => {
    setCategoryValue(e.target.value);
    getRecipesList(nameValue, Tage, e.target.value);
  };
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setrecipeId(id);
    setShow(true);
  };

  let getRecipesList = async (name, tagId, categoryId) => {
    let res = await axios.get(
      "https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1",
      {
        params: { name, tagId, categoryId },
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    console.log(res.data.data);
    setRecipesList(res?.data.data);
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

  let deleteRecipesList = async () => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      handleClose();
      getRecipesList();
      toast.success("this recipe deleted");
    } catch (error) {
      console.log(error);
    }
  };
  let dateFormate = (datee) => {
    let date = new Date(datee);
    return date.toDateString();
  };

  useEffect(() => {
    getRecipesList();
    getTag();
    getCategoriesList();
  }, []);

  return (
    <>
      <Header
        title={"Recipes"}
        item={"Items"}
        desc={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <div className="d-flex justify-content-between align-items-center my-4">
        <div>
          <h3>Recipe Table Details</h3>
          <span>You can check all details</span>
        </div>
        <div>
          <Link to={"new-recipe"} className="btn  px-5 btn-lg btn-success">
            Add New Item
          </Link>
        </div>
      </div>
      <div className="my-5">
        <div className="row g-2">
          <div className="col-md-6">
            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg "
                placeholder="Search By Recipe Name ..."
                onChange={getName}
              />
            </div>
          </div>
          <div className="col-md-3">
            <select
              onChange={getTage}
              className="form-select form-select-lg"
              aria-label="Default select example"
            >
              <option value="">Tag</option>
              {tags.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <select
              className="form-select form-select-lg"
              aria-label="Default select example"
                onChange={getCat}
              >
                <option value="">Category</option>
                {CategoriesList.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div>
        {RecipesList.length > 0 ? (
          <>
            <DeleteConfirmation
              show={show}
              handleClose={handleClose}
              deltedItem={"recipe"}
              deleteFun={deleteRecipesList}
            />

            <div>
              <table className="table table-striped">
                <thead>
                  <tr className="table-active">
                    <th className="p-4  rounded-start-4" scope="col">
                      ID
                    </th>
                    <th className="py-4" scope="col">
                      NAME
                    </th>

                    <th className="py-4" scope="col">
                      Image
                    </th>
                    <th className="py-4" scope="col">
                      Price
                    </th>
                    <th className="py-4" scope="col">
                      description
                    </th>

                    <th className="py-4" scope="col">
                      tag
                    </th>

                    <th className="py-4" scope="col">
                      category
                    </th>

                    <th className="py-4 rounded-end-4" scope="col">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {RecipesList.map((recipe) => (
                    <tr key={recipe.id}>
                      <td className="p-4 " scope="row">
                        {recipe.id}
                      </td>
                      <td className="p-4 " scope="row">
                        {recipe.name}
                      </td>
                      <td className="py-4">
                        {recipe.imagePath == "" ? (
                          <img
                            src={noimg}
                            style={{ width: 40 }}
                            className="rounded-2"
                            alt=""
                          />
                        ) : (
                          <img
                            src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`}
                            style={{ width: 60 }}
                            className="rounded-2"
                            alt=""
                          />
                        )}
                      </td>
                      <td className="py-4">{recipe.price}LE</td>
                      <td className="py-4">{recipe.description}</td>
                      <td className="py-4">{recipe.tag.name}</td>
                      <td className="py-4">{recipe.category[0]?.name}</td>
                      <td className="py-4">
                        <i
                          className="fa-regular fa-trash-can text-danger mx-2 "
                          onClick={() => handleShow(recipe.id)}
                        ></i>
                        <Link to={`${recipe.id}`}>
                          <i className="fa-regular fa-pen-to-square text-warning mx-2"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <h1>loading</h1>
          //  <NoData />
        )}
      </div>
    </>
  );
}
