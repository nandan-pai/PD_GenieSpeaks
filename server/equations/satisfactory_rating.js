const satisfactory_rating = {
	$cond: [ //conditional statement
		{
			$eq: [
				{
					$size: "$reviews",
				},
				0,
			],
		},// if condition
		0,// if true body
		{
			$multiply: [
				{
					$divide: [
						"$rating_sum",
						{
							$multiply: [
								{
									$size: "$reviews",
								},
								5,
							],
						},
					],
				},
				100,
			],
		},// if false body
	],
}

module.exports = satisfactory_rating;
