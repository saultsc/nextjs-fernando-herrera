'use server';
import prisma from '@/lib/prisma';

export const getProductBySlug = async (slug: string) => {
	try {
		const product = await prisma.product.findFirst({
			where: {
				slug,
			},
			include: {
				ProductImage: {
					select: {
						url: true,
					},
				},
			},
		});

		if (!product) return null;

		const { ProductImage, ...rest } = product;

		return {
			...rest,
			images: product.ProductImage.map((image) => image.url),
		};
	} catch (error) {
		throw new Error('Error al obtener el producto');
	}
};
