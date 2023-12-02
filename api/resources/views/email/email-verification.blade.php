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
							<p>Bienvenido al programa Advance Expert Program</p>
							<p>Por favor siga los siguientes pasos para acceder a la plataforma</p>
						</td>
					</tr>

					<tr>
						<td>
							<p>1. Tome nota de su contraseña temporal: <strong>advance</strong>
									<br>
									La podrá cambiar desde la plataforma en "mi cuenta", el apartado de "Seguridad, Cambiar la contraseña".
									<br>
									Su usuario es su correo electrónico con el que ha sido registrado en la plataforma.
							</p>
							<p>
								2. Por favor haga click en el botón de abajo para verificar su correo electrónico
							</p>
							<p>
								3. Acceda a la plataforma con su usuario y password en
								<a href="https://advancedexpertprogram.com/" target="_blank">https://advancedexpertprogram.com</a>
							</p>
						</td>
					</tr>

					<tr>
						<td style="text-align: center;">
							<a
								href="{{ $app_uri.'/account/verify/?token='.$token }}""
								style="background: #00a6af; border-width: 0px; color: white; padding: 10px 30px; border-radius: 8px; display: inline-block; text-decoration: none;">
								{{ __('Verify Email Address') }}
							</a>
						</td>
					</tr>

					<tr>
						<td>
							<p>
								Muchas gracias por su colaboración
								<br>
								El equipo coordinador
								<br>
								Advance Expert Program
								<br>
								advanced@kaccesshealth.com
							</p>
						</td>
					</tr>
				</table>

			</td>
		</tr>
	</table>
