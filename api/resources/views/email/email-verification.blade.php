{{ __('Please click the button below to verify your email address.') }}
<a href="{{ route('user.verify', $token) }}">{{ __('Verify Email Address') }}</a>
