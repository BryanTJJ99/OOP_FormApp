package com.oopproject.form.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.oopproject.form.repositories.ApproverRepository;

@Service
@Qualifier("approver")
public class ApproverServiceImp extends AdminServiceImp implements ApproverService {

    @Autowired
    private ApproverRepository approverRepository;

    @Override
    public boolean approveForm() {
        // TODO check if rejectForm is true
        // if true, change rejectForm to false
        // change approve form to true
        throw new UnsupportedOperationException("Unimplemented method 'approveForm'");
    }

    @Override
    public boolean rejectForm() {
        // TODO check if approveForm is true
        // if true, change approveForm to false
        // change reject form to true
        throw new UnsupportedOperationException("Unimplemented method 'rejectForm'");
    }

}
