import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, getBrands,  getTypes} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        getTypes().then(data => device.setTypes(data))
        getBrands().then(data => device.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', id: Date.now()}])
    }

    const removeInfo = (id) => {
        setInfo(info.filter(el => el.id !== id))
    }

    const changeInfo = (key, value, id) => {
        setInfo(info.map(el => el.id === id ? {...el, [key]: value} : el))
    }

    const selectFile = (e) => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', String(price))
        formData.append('img', file)
        formData.append('typeId', device.selectedType.id)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('info', JSON.stringify(info))

        createDevice(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить девайс
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className='mt-2'>
                    <Dropdown.Toggle>{device.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.types.map(type =>
                            <Dropdown.Item
                                onClick={() => device.setSelectedType(type)}
                                key={type.id}
                            >
                                {type.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='mt-2'>
                    <Dropdown.Toggle>{device.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.brands.map(brand =>
                            <Dropdown.Item
                                onClick={() => device.setSelectedBrand(brand)}
                                key={brand.id}
                            >
                                {brand.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                    className='mt-3'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Введите название устройства'
                />
                <Form.Control
                    className='mt-3'
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    type='number'
                    placeholder='Введите стоимость устройства'
                />
                <Form.Control onChange={selectFile} className='mt-3' type='file'/>
                <hr/>
                <Button onClick={addInfo} variant='dark'>Добавить новое свойство</Button>
                {info.map(el =>
                    <Row className='mt-2' key={el.id}>
                        <Col md={4}>
                            <Form.Control
                                value={el.title}
                                onChange={(e) => changeInfo('title', e.target.value, el.id)}
                                placeholder='Введите название характеристики'
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                value={el.description}
                                onChange={(e) => changeInfo('description', e.target.value, el.id)}
                                placeholder='Введите описание характеристики'
                            />
                        </Col>
                        <Col md={4}>
                            <Button onClick={() => removeInfo(el.id)} variant='outline-danger'>Удалить</Button>
                        </Col>
                    </Row>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;