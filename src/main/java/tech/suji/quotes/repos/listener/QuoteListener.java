package tech.suji.quotes.repos.listener;

import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

import tech.suji.quotes.entity.Quote;
import tech.suji.quotes.service.PrimarySequenceService;


@Component
public class QuoteListener extends AbstractMongoEventListener<Quote> {

    private final PrimarySequenceService primarySequenceService;

    public QuoteListener(final PrimarySequenceService primarySequenceService) {
        this.primarySequenceService = primarySequenceService;
    }

    @Override
    public void onBeforeConvert(final BeforeConvertEvent<Quote> event) {
        if (event.getSource().getId() == null) {
            event.getSource().setId(primarySequenceService.getNextValue());
        }
    }

}
