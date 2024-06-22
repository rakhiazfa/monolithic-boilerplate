import Page from '@/components/container/page';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { Card, CardBody } from '@nextui-org/card';
import Form from './form';
import BackButton from '@/components/ui/back-button';

export default function CreateMenu() {
    const breadcrumbs = [{ name: 'Menus', href: '/iam/menus' }, { name: 'Create Menu' }];

    return (
        <Page title="Create Menu">
            <main>
                <section className="app-container">
                    <Breadcrumbs breadcrumbs={breadcrumbs} className="mb-5" />
                    <div className="flex justify-between items-center mb-7">
                        <h1 className="app-page-title">Create Menu</h1>
                        <BackButton href="/iam/menus" />
                    </div>
                    <Card>
                        <CardBody className="p-5">
                            <Form />
                        </CardBody>
                    </Card>
                </section>
            </main>
        </Page>
    );
}
