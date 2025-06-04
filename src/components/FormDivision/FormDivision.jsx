import React from 'react';
import { Form, Input, Switch, Button, message } from 'antd';
import { Agregardivision } from '../../services/ServiceDivision';

const FormularioDatos = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await Agregardivision(values);
      message.success("División agregada correctamente");
      form.resetFields();
    } catch (error) {
      message.error(error);
    }
  };
  return (
    <Form
      form={form}
      name="formularioDatos"
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ activo: true }}
      style={{ maxWidth: 400, width: '100%', padding: 20 }}
    >
      <Form.Item
        label="Clave"
        name="clave"
        rules={[{ required: true, message: 'Por favor ingresa la clave' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Nombre"
        name="nombre"
        rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Activo"
        name="activo"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
};
export default FormularioDatos;