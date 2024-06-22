import { Button } from '@nextui-org/button';
import Link from 'next/link';

type BackButtonProps = {
    href: string;
    className?: string;
};

const BackButton = ({ href, className }: BackButtonProps) => {
    return (
        <Button as={Link} href={href} className={className} variant="bordered">
            Back
        </Button>
    );
};

export default BackButton;
