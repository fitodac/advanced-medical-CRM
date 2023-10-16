<style>
	body{
		background: #EEE;
		padding: 0;
		margin: 0;
	}
</style>

<table 
	align="center" 
	style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
		<tr>
			<td style="height:20px;"></td>
		</tr>
		<tr>
			<td>

				<table style="background-color: white; padding: 30px;">
					<tr>
						<td>
							<p>{{ __('Please click the button below to verify your email address.') }}</p>
						</td>
					</tr>

					<tr>
						<td style="text-align: center;">
							<br>
							<br>
							<a 
								href="{{ route('user.verify', $token) }}"
								style="background: black; color: white; padding: 10px 30px; border-radius: 8px; display: inline-block; text-decoration: none;">
								{{ __('Verify Email Address') }}
							</a>
						</td>
					</tr>
				</table>

			</td>
		</tr>
	</table>