import { PrismaClient, Category } from "@prisma/client";

const prisma = new PrismaClient();

const getCategorysService = async (): Promise<Category[]> => {
    const Categorys = await prisma.category.findMany();

    if (Categorys.length === 0) {
        throw { message: "No Categorys found!" };
    }

    return Categorys;
};

const getCategoryByIdService = async (id: string): Promise<Category | null> => {
    const Category = await prisma.category.findFirst({
        where: {
            id: Number(id),
        },
    });

    if (!Category) {
        throw { message: "No a Category found!" };
    }

    return Category as Category;
};

const createCategoryService = async (
    name: string,
    description: string
): Promise<Category | null> => {
    const Category = await prisma.category.create({
        data: {
            name,
            description,
        },
    });

    return Category;
};

const updateCategoryService = async (
    id: string,
    name: string,
    description: string
): Promise<Category | null> => {
    const Category = await prisma.category.update({
        where: {
            id: Number(id),
        },
        data: {
            name,
            description,
        },
    });

    return Category;
};

const deleteCategoryService = async (id: number) => {
    const Category = await prisma.category.delete({
        where: {
            id: Number(id),
        },
    });

    return Category;
};

export {
    getCategorysService,
    getCategoryByIdService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService,
};
