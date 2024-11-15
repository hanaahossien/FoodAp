import React from 'react'

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import nodata from "../../../../assets/nodata.svg"
export default function DeleteConfirmation({show,handleClose,deleteFun,deltedItem}) {
  return (
   <>

   <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className='border-0  deleteconfirmatin'>
          <Modal.Title >
            <i className="fa-solid fa-xmark text-danger  border border-2 border-danger px-2 p-1 rounded-circle " onClick={handleClose}></i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center px-5">
          <div>
            <img src={nodata} alt=""  />
          </div>
          <h4 className='my-3'>Delete This {deltedItem} ?</h4>
          <span>
            are you sure you want to delete this item ? if you are sure just
            click on delete it
          </span>
        </Modal.Body>
        <Modal.Footer className='border-0'>
          <Button  variant="light" className='btn btn-outline-danger fw-bold' onClick={deleteFun} >
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  )
}
