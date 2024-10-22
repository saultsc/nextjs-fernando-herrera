'use server';

import prisma from '@/lib/prisma';
import { Gender } from '@prisma/client';

interface PaginationOptions {
	page?: number;
	take?: number;
	gender?: Gender;
}

export const getPaginationProductsWithImages = async ({
	page = 1,
	take = 12,
	gender,
}: PaginationOptions) => {
	if (isNaN(Number(page))) page = 1;
	if (page < 1) page = 1;

	try {
		const products = await prisma.product.findMany({
			include: {
				ProductImage: {
					take: 2,
					select: {
						url: true,
					},
				},
			},
			skip: (page - 1) * take,
			take,

			where: {
				gender,
			},
		});

		const totalProducts = await prisma.product.count({
			where: {
				gender,
			},
		});

		return {
			currentPage: page,
			totalPages: Math.ceil(totalProducts / take),
			products: products.map(({ ProductImage, ...rest }) => ({
				...rest,
				images: ProductImage.map((image) => image.url),
			})),
		};
	} catch (error) {
		throw new Error('Error al obtener los productos');
	}
};
