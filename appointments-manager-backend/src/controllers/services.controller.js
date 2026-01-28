import * as serviceServices from '../services/service.service.js';

export const getAllServices = async (req, res) => {
    const services = await serviceServices.getAllServices();
    res.json(services);
}

export const getServiceById = async (req, res) => {
    const service = await serviceServices.getById(req.params.id)
    res.json(service)
}

export const addService = async (req, res) => {
    try {
        const newService = await serviceServices.addService(req.body);
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const updateService = async (req, res) => {
    try {
        const updatedService = await serviceServices.updateService(req.params.id, req.body);
        res.json(updatedService);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const deleteService = async (req, res) => {
    try {
        await serviceServices.deleteService(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};