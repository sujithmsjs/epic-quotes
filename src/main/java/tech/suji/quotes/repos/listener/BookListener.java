package tech.suji.quotes.repos.listener;

import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

import tech.suji.quotes.entity.Book;
import tech.suji.quotes.service.PrimarySequenceService;


@Component
public class BookListener extends AbstractMongoEventListener<Book> {

    private final PrimarySequenceService primarySequenceService;

    public BookListener(final PrimarySequenceService primarySequenceService) {
        this.primarySequenceService = primarySequenceService;
    }

    @Override
    public void onBeforeConvert(final BeforeConvertEvent<Book> event) {
        if (event.getSource().getId() == null) {
            event.getSource().setId(primarySequenceService.getNextValue());
        }
    }

}
