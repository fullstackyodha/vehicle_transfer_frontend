'use client';

import { Box } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const DriverCard = ({ driver }) => {
	const [imageData, setImageData] = useState('');

	useEffect(() => {
		// Fetch image path from the backend
		const fetchImageData = async () => {
			try {
				const response = await fetch(
					`http://localhost:8000/api/v1/drivers/profilePhoto/${driver.profilePhoto}`,
					{
						method: 'GET',
					}
				);

				setImageData(response.url);
			} catch (error) {
				console.error('Error fetching image data:', error);
			}
		};

		fetchImageData();
	}, [driver, imageData]);

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					width: '50%',
					padding: '1rem',
					backgroundColor: '#dcdee0',
					borderRadius: '10px',
				}}
			>
				<Box>
					<Image
						style={{ borderRadius: '10%', objectFit: 'cover' }}
						src={imageData}
						width={55}
						height={55}
						alt={driver.name}
						quality={100}
					/>
				</Box>

				<Box
					sx={{
						width: '100%',
						padding: '0 2rem',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Box sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
						{driver.name}
					</Box>

					<Box
						sx={{
							backgroundColor: '#eda909',
							fontWeight: 'bold',
							fontSize: '1rem',
							padding: '0.3rem 0.4rem',
							borderRadius: '10px',
						}}
					>
						{driver.phoneNumber}
					</Box>
				</Box>
			</Box>
		</>
	);
};
