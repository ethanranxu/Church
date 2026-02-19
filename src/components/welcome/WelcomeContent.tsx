'use client';

import React, { useState } from 'react';
import {
    WelcomeHero,
    PastorMessage,
    NewcomerGuide,
    WorshipSchedule,
    FAQ,
    Testimonials,
    VisitCTA,
} from "@/components/welcome";
import VisitModal from "@/components/welcome/VisitModal";

export default function WelcomeContent() {
    const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

    return (
        <React.Fragment>
            <WelcomeHero />
            <PastorMessage />
            <NewcomerGuide />
            <WorshipSchedule />
            <FAQ />
            <Testimonials />
            <VisitCTA onOpenModal={() => setIsVisitModalOpen(true)} />
            <VisitModal
                isOpen={isVisitModalOpen}
                onClose={() => setIsVisitModalOpen(false)}
            />
        </React.Fragment>
    );
}
