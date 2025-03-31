import { Category, Transaction } from './types';

export const sampleCategories: Category[] = [
    { id: '1', name: 'Alimentación', color: '#22c55e' },
    { id: '2', name: 'Transporte', color: '#3b82f6' },
    { id: '3', name: 'Hogar', color: '#f97316' },
    { id: '4', name: 'Entretenimiento', color: '#8b5cf6' },
    { id: '5', name: 'Salud', color: '#ec4899' },
    { id: '6', name: 'Educación', color: '#14b8a6' },
    { id: '7', name: 'Salario', color: '#6366f1' },
    { id: '8', name: 'Otros ingresos', color: '#a3e635' },
];

export const sampleTransactions: Transaction[] = [
    {
        id: '1',
        type: 'income',
        concept: 'Salario',
        description: 'Salario mensual',
        amount: 3500000,
        date: new Date('2023-07-05'),
        categoryId: '7',
    },
    {
        id: '2',
        type: 'expense',
        concept: 'Arriendo',
        description: 'Arriendo mensual',
        amount: 1200000,
        date: new Date('2023-07-02'),
        categoryId: '3',
    },
    {
        id: '3',
        type: 'expense',
        concept: 'Mercado',
        description: 'Compras del mes',
        amount: 450000,
        date: new Date('2023-07-10'),
        categoryId: '1',
    },
    {
        id: '4',
        type: 'expense',
        concept: 'Netflix',
        description: 'Suscripción mensual',
        amount: 38900,
        date: new Date('2023-07-15'),
        categoryId: '4',
    },
    {
        id: '5',
        type: 'income',
        concept: 'Trabajo freelance',
        description: 'Proyecto de diseño',
        amount: 850000,
        date: new Date('2023-07-18'),
        categoryId: '8',
    },
    {
        id: '6',
        type: 'expense',
        concept: 'Uber',
        description: 'Viaje al aeropuerto',
        amount: 65000,
        date: new Date('2023-07-20'),
        categoryId: '2',
    },
    {
        id: '7',
        type: 'expense',
        concept: 'Medicina',
        description: 'Consulta médica',
        amount: 120000,
        date: new Date('2023-07-22'),
        categoryId: '5',
    },
    {
        id: '8',
        type: 'expense',
        concept: 'Curso online',
        description: 'Curso de desarrollo web',
        amount: 250000,
        date: new Date('2023-07-25'),
        categoryId: '6',
    },
];

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const getCategoryById = (id: string): Category | undefined => {
    return sampleCategories.find(category => category.id === id);
};

export const getDashboardSummary = () => {
    const totalIncome = sampleTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = sampleTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    const recentTransactions = [...sampleTransactions]
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 5);

    return {
        totalIncome,
        totalExpense,
        balance,
        recentTransactions,
    };
};
