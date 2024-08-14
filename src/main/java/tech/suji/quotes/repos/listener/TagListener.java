package tech.suji.quotes.repos.listener;

import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

import tech.suji.quotes.entity.Tag;
import tech.suji.quotes.service.PrimarySequenceService;


@Component
public class TagListener extends AbstractMongoEventListener<Tag> {

    private final PrimarySequenceService primarySequenceService;

    public TagListener(final PrimarySequenceService primarySequenceService) {
        this.primarySequenceService = primarySequenceService;
    }

    @Override
    public void onBeforeConvert(final BeforeConvertEvent<Tag> event) {
        if (event.getSource().getId() == null) {
            event.getSource().setId(primarySequenceService.getNextValue());
        }
    }

}
