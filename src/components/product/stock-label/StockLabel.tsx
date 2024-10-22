'use client';

import { getStockBySlug } from '@/actions';
import { titleFont } from '@/config/fonts';
import { useEffect, useState } from 'react';

interface Props {
	slug: string;
}
export const StockLabel = ({ slug }: Props) => {
	const [inStock, setInStock] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		getStock();
	}, []);

	const getStock = async () => {
		const inStock = await getStockBySlug(slug);
		setInStock(inStock);
		setIsLoading(false);
	};

	return (
		<>
			{isLoading ? (
				<h1
					className={` ${titleFont.className} antialiased font-bold text-lg bg-gray-200 animate-pulse `}
				>
					&nbsp;
				</h1>
			) : (
				<h1 className={` ${titleFont.className} antialiased font-bold text-lg`}>
					Stock: {inStock}
				</h1>
			)}
		</>
	);
};
