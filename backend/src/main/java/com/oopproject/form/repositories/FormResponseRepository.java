package com.oopproject.form.repositories;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.oopproject.form.models.FormResponse.FormResponse;

public interface FormResponseRepository extends MongoRepository<FormResponse, String> {
    Optional<FormResponse> findByFormTemplateIdAndVendorProjectId(String formTemplateId, String vendorProjectId);

    List<FormResponse> findAll();
    // void updateFormAnswerValue(String id, String key, Object value);

    @Query("{ 'vendorDeadline' : { $gte: ?0, $lte: ?1 } }")
    List<FormResponse> findFormsWithinDateRange(Date start, Date end);

}