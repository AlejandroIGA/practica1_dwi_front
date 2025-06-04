import React, { useEffect, useState } from 'react';
import { obtenerDivisiones, obtenerDivisionPorId } from '../../services/ServiceDivision';
import { Table, Button, Input, Spin, Alert } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
function ConsultaDivisiones() {
    const [allDivisiones, setAllDivisiones] = useState([]);
    const [filteredDivisiones, setFilteredDivisiones] = useState([]);
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchDivisiones = async () => {
            setLoading(true);
            try {
                const data = await obtenerDivisiones(true); 
                setAllDivisiones(data);
                setFilteredDivisiones(data); 
                setError(null);
            } catch (err) {
                console.error("Error divisiones:", err);
                setError('Error al obtener las divisiones activas.');
            } finally {
                setLoading(false);
            }
        };
        fetchDivisiones();
    }, []);
    const handleBuscarPorId = async () => {
        if (!id.trim()) {
            setError('Ingresa un ID para buscar.');
            setFilteredDivisiones(allDivisiones); 
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await obtenerDivisionPorId(id);
            if (data) { 
                setFilteredDivisiones([data]); 
            } else {
                setFilteredDivisiones([]); 
                setError('División no encontrada.');
            }
        } catch (err) {
            console.error("Error al buscar division por ID:", err);
            setError('No se pudo encontrar la división con el ID.');
            setFilteredDivisiones([]); 
        } finally {
            setLoading(false);
        }
    };
    const handleLimpiarBusqueda = () => {
        setId('');
        setFilteredDivisiones(allDivisiones); 
        setError(null);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Clave',
            dataIndex: 'clave',
            key: 'clave',
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Activo',
            dataIndex: 'activo',
            key: 'activo',
            render: (activo) => (activo ? 'Sí' : 'No'),
        },
    ];
    return (
         <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
            <div style={{ marginBottom: 20}}>
                <Input type="number" placeholder="Buscar por ID" value={id} onChange={(e) => setId(e.target.value)} style={{ width: 200, marginRight: '5px' }} />
                <Button onClick={handleBuscarPorId} icon={<SearchOutlined />} type="primary" />
                <Button onClick={handleLimpiarBusqueda} icon={<CloseOutlined />} danger >Limpiar</Button>
            </div>
            {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 20 }} />}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <Spin size="large" tip="Cargando divisiones..." />
                </div>
            ) : (
                <>
                    {filteredDivisiones.length > 0 ? (
                        <div>
                            <h3>Divisiones {id ? `(Filtrado por ID: ${id})` : 'Activas'}</h3>
                            <Table dataSource={filteredDivisiones} rowKey="id" columns={columns} pagination={{ pageSize: 10 }} bordered />
                        </div>
                    ) : (
                        !error && <Alert message="No se encontraron divisiones" type="info" showIcon />
                    )}
                </>
            )}
        </div>
    );
}
export default ConsultaDivisiones;