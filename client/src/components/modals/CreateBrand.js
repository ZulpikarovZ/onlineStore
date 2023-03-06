import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createBrand} from "../../http/deviceAPI";

const CreateBrand = ({show, onHide}) => {
    const [brand, setBrand] = useState('')

    const addBrand = (brand) => {
        createBrand({name: brand}).then(data => {
            setBrand('')
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={brand}
                        onChange={e => setBrand(e.target.value)}
                        placeholder='Введите название бренда'
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={() => addBrand(brand)}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;