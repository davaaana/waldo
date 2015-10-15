package com.monsource.waldo.jpa.entity;

import com.monsource.waldo.model.type.PostType;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

/**
 * Created by nasanjargal on 5/24/2015.
 */
@Entity
@Table(name = "post", schema = "public", catalog = "waldo_st")
public class PostEntity {
    List<PostContactEntity> postContacts;
    List<RateEntity> rates;
    private Long id;
    private Date when;
    private Date arrive;
    private Integer passanger;
    private String stuff;
    private String animal;
    private PostType type;
    private String contact;
    private String description;
    private Boolean closed;
    private Integer requestNum;
    private Timestamp createdDate;
    private Timestamp modifiedDate;
    private AccountEntity account;
    private CityEntity toCity;
    private DistrictEntity toDistrict;
    private CityEntity fromCity;
    private DistrictEntity fromDistrict;
    private TransportationEntity transportation;
    private List<PolicyEntity> policies;

    @Id
    @SequenceGenerator(name = "post_id_seq", sequenceName = "post_id_seq", schema = "public")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "post_id_seq")
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "`when`")
    public Date getWhen() {
        return when;
    }

    public void setWhen(Date when) {
        this.when = when;
    }

    @Basic
    @Column(name = "arrive")
    public Date getArrive() {
        return arrive;
    }

    public void setArrive(Date arrive) {
        this.arrive = arrive;
    }

    @Basic
    @Column(name = "passanger")
    public Integer getPassanger() {
        return passanger;
    }

    public void setPassanger(Integer passanger) {
        this.passanger = passanger;
    }

    @Basic
    @Column(name = "stuff")
    public String getStuff() {
        return stuff;
    }

    public void setStuff(String stuff) {
        this.stuff = stuff;
    }

    @Basic
    @Column(name = "animal")
    public String getAnimal() {
        return animal;
    }

    public void setAnimal(String animal) {
        this.animal = animal;
    }

    @Basic
    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    public PostType getType() {
        return type;
    }

    public void setType(PostType type) {
        this.type = type;
    }

    @Basic
    @Column(name = "contact")
    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    @Basic
    @Column(name = "description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Basic
    @Column(name = "closed")
    public Boolean getClosed() {
        return closed;
    }

    public void setClosed(Boolean closed) {
        this.closed = closed;
    }

    @Basic
    @Column(name = "request_num")
    public Integer getRequestNum() {
        return requestNum;
    }

    public void setRequestNum(Integer requestNum) {
        this.requestNum = requestNum;
    }

    @Basic
    @Column(name = "created_date")
    public Timestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Timestamp createdDate) {
        this.createdDate = createdDate;
    }

    @Basic
    @Column(name = "modified_date")
    public Timestamp getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(Timestamp modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PostEntity that = (PostEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (when != null ? !when.equals(that.when) : that.when != null) return false;
        if (requestNum != null ? !requestNum.equals(that.when) : that.requestNum != null) return false;
        if (arrive != null ? !arrive.equals(that.arrive) : that.arrive != null) return false;
        if (passanger != null ? !passanger.equals(that.passanger) : that.passanger != null) return false;
        if (stuff != null ? !stuff.equals(that.stuff) : that.stuff != null) return false;
        if (animal != null ? !animal.equals(that.animal) : that.animal != null) return false;
        if (type != that.type) return false;
        if (contact != null ? !contact.equals(that.contact) : that.contact != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;
        if (closed != null ? !closed.equals(that.closed) : that.closed != null) return false;
        if (createdDate != null ? !createdDate.equals(that.createdDate) : that.createdDate != null) return false;
        return !(modifiedDate != null ? !modifiedDate.equals(that.modifiedDate) : that.modifiedDate != null);

    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (when != null ? when.hashCode() : 0);
        result = 31 * result + (requestNum != null ? requestNum.hashCode() : 0);
        result = 31 * result + (arrive != null ? arrive.hashCode() : 0);
        result = 31 * result + (passanger != null ? passanger.hashCode() : 0);
        result = 31 * result + (stuff != null ? stuff.hashCode() : 0);
        result = 31 * result + (animal != null ? animal.hashCode() : 0);
        result = 31 * result + (type != null ? type.hashCode() : 0);
        result = 31 * result + (contact != null ? contact.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (closed != null ? closed.hashCode() : 0);
        result = 31 * result + (createdDate != null ? createdDate.hashCode() : 0);
        result = 31 * result + (modifiedDate != null ? modifiedDate.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id", nullable = false)
    public AccountEntity getAccount() {
        return account;
    }

    public void setAccount(AccountEntity account) {
        this.account = account;
    }

    @ManyToOne
    @JoinColumn(name = "city_id", referencedColumnName = "id", nullable = false)
    public CityEntity getToCity() {
        return toCity;
    }

    public void setToCity(CityEntity toCity) {
        this.toCity = toCity;
    }

    @ManyToOne
    @JoinColumn(name = "district_id", referencedColumnName = "id", nullable = true)
    public DistrictEntity getToDistrict() {
        return toDistrict;
    }

    public void setToDistrict(DistrictEntity toDistrict) {
        this.toDistrict = toDistrict;
    }

    @ManyToOne
    @JoinColumn(name = "from_city_id", referencedColumnName = "id", nullable = false)
    public CityEntity getFromCity() {
        return fromCity;
    }

    public void setFromCity(CityEntity fromCity) {
        this.fromCity = fromCity;
    }

    @ManyToOne
    @JoinColumn(name = "from_district_id", referencedColumnName = "id", nullable = true)
    public DistrictEntity getFromDistrict() {
        return fromDistrict;
    }

    public void setFromDistrict(DistrictEntity fromDistrict) {
        this.fromDistrict = fromDistrict;
    }

    @ManyToOne
    @JoinColumn(name = "transportation_id", referencedColumnName = "id", nullable = true)
    public TransportationEntity getTransportation() {
        return transportation;
    }

    public void setTransportation(TransportationEntity transportation) {
        this.transportation = transportation;
    }

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    public List<PostContactEntity> getPostContacts() {
        return postContacts;
    }

    public void setPostContacts(List<PostContactEntity> postContacts) {
        this.postContacts = postContacts;
    }

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    public List<RateEntity> getRates() {
        return rates;
    }

    public void setRates(List<RateEntity> rates) {
        this.rates = rates;
    }

    @ManyToMany()
    @JoinTable(name = "post_policy", catalog = "waldo_st", schema = "public",
            joinColumns = @JoinColumn(name = "post_id", referencedColumnName = "id", nullable = false, updatable = false),
            inverseJoinColumns = @JoinColumn(name = "policy_id", referencedColumnName = "id", nullable = false, updatable = false)
    )
    public List<PolicyEntity> getPolicies() {
        return policies;
    }

    public void setPolicies(List<PolicyEntity> policies) {
        this.policies = policies;
    }
}
