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

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setrecipeId(id);
    setShow(true);
  };

  let getRecipesList = async () => {
    let res = await axios.get(
      "https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1",
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    console.log(res)
    setRecipesList(res?.data.data);
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

      <div className="d-flex justify-content-between align-items-center my-3">
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
      <div>
        {RecipesList.length > 0 ? (
          <>
            <DeleteConfirmation
              show={show}
              handleClose={handleClose}
              deltedItem={"recipeeeeeee"}
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
                      <td className="py-4">
                        {recipe.tag.name}
                      </td>
                      <td className="py-4">
                        {recipe.category[0]?.name}
                      </td>
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
