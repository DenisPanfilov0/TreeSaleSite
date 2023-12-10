import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const Order: React.FC = () => {

  return (
    <>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >


        <Form.Item label="Имя">
          <Input />
        </Form.Item>

        <Form.Item label="Фамилия">
          <Input />
        </Form.Item>

        <Form.Item label="Отчество">
          <Input />
        </Form.Item>

        <Form.Item label="Адрес доставки">
          <Input />
        </Form.Item>

        <Form.Item label="Номер Телефона">
          <Input />
        </Form.Item>

        <Form.Item label="Дата Доставки">
          <DatePicker />
        </Form.Item>

        <Form.Item label="Товар">
          <Input />
        </Form.Item>

        <Form.Item label="Количество">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Доп. услуги">
          <Radio.Group>
            <Radio value="logs"> В чурках </Radio>
            <Radio value="firewood"> Колотые </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Коментарий">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Способ оплаты">
          <Radio.Group>
            <Radio value="cash"> Наличными </Radio>
            <Radio value="non-cash" disabled={true}> Безналичный </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label=" " colon={false}>
            <Button type="primary">Оформить заказ</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Order;