package ru.mera.lib.model;

import ru.mera.lib.entity.Pupil;

import java.util.List;

public class PupilPagination {

    private List<Pupil> pupils;
    private int pageCount;
    private int totalItems;

    public PupilPagination(List<Pupil> pupils, int pageCount, int totalItems) {
        this.pupils = pupils;
        this.pageCount = pageCount;
        this.totalItems = totalItems;
    }

    public List<Pupil> getPupils() {
        return pupils;
    }

    public void setPupils(List<Pupil> pupils) {
        this.pupils = pupils;
    }

    public int getPageCount() {
        return pageCount;
    }

    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }

    public int getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(int totalItems) {
        this.totalItems = totalItems;
    }
}
