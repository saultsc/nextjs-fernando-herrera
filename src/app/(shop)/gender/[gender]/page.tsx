export const revalidate = 60;

import { redirect } from 'next/navigation';
import { Gender } from '@prisma/client';

import { getPaginationProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';

interface Props {
	searchParams: {
		page: string;
	};
	params: {
		gender: string;
	};
}

export default async function GenderPage({ params, searchParams }: Props) {
	const { gender } = params;
	const page = searchParams.page ? Number(searchParams.page) : 1;

	const { products, totalPages } = await getPaginationProductsWithImages({
		page,
		gender: gender as Gender,
	});

	if (products.length === 0) {
		redirect(`/gender/${gender}`);
	}

	const labels: Record<string, string> = {
		men: 'para hombres',
		women: 'para mujeres',
		kid: 'para niños',
		unisex: 'para todos',
	};

	// if ( id === 'kids' ) {
	//   notFound();
	// }

	return (
		<>
			<Title
				title={`Artículos de ${labels[gender]}`}
				subtitle="Todos los productos"
				className="mb-2"
			/>

			<ProductGrid products={products} />

			<Pagination totalPages={totalPages} />
		</>
	);
}
