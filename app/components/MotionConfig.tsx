import { MotionConfig as FramerMotionConfig, MotionConfigProps } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionConfigWrapperProps {
    children: ReactNode;
}

export default function MotionConfig({ children }: MotionConfigWrapperProps) {
    const motionConfig: MotionConfigProps = {
        reducedMotion: 'user', // Respects user's reduced motion settings
        transition: {
            // Default transition settings for the entire app
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.25,
        }
    };

    return (
        <FramerMotionConfig {...motionConfig}>
            {children}
        </FramerMotionConfig>
    );
} 