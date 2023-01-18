import AppLogo from '@sd/assets/images/logo.png';
import { getOnboardingStore, useOnboardingStore } from '@sd/client';
import { Button } from '@sd/ui';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';

// import { useUnlockOnboardingScreen } from './OnboardingProgress';
import { OnboardingContainer, OnboardingDescription, OnboardingImg } from './OnboardingRoot';

export default function OnboardingStart() {
	const navigate = useNavigate();

	return (
		<OnboardingContainer>
			<OnboardingImg src={AppLogo} className="w-32 h-32 mb-8" />

			<h1 className="mb-2 text-4xl font-bold text-center text-ink">
				The file explorer from the future.
			</h1>
			<OnboardingDescription>
				Welcome to Spacedrive, an open source cross-platform file manager.
			</OnboardingDescription>
			<div className="mt-6 space-x-3">
				<Button onClick={() => navigate('/onboarding/new-library')} variant="accent" size="md">
					Get started
				</Button>
			</div>
		</OnboardingContainer>
	);
}
