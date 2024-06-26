
import { of as observableOf, Observable } from 'rxjs';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { SharedModule, ResourceService, ConfigService, BrowserCacheTtlService, UtilService } from '@sunbird/shared';
import { CoreModule, OrgDetailsService, ContentService, PublicDataService } from '@sunbird/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule, Router } from '@angular/router';
import { CacheService } from 'ng2-cache-service';
import * as _ from 'lodash-es';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LearnathonLanguageComponent } from './learnathon-language.component';
import { configureTestSuite } from '@sunbird/test-util';

describe('LearnathonLanguageComponent', () => {
    let component: LearnathonLanguageComponent;
    let fixture: ComponentFixture<LearnathonLanguageComponent>;
    const resourceBundle = {
        'messages': {
            'stmsg': {
                'm0007': 'Search for something else',
                'm0006': 'No result'
            },
            'fmsg': {
                'm0077': 'Fetching search result failed',
                'm0051': 'Fetching other courses failed, please try again later...'
            }
        },
        languageSelected$: observableOf({}),
        getLanguageChange: () => { },
        initialize: () => {},
        getResource: () => ({})
    };
    const mockQueryParma = {
        'query': 'hello'
    };
    const routerStub = {
        url: '',
        navigate : jasmine.createSpy('navigate')
    };
    const fakeActivatedRoute = {
        'queryParams': observableOf({ language: 'en' }),
        snapshot: {
            params: {
                slug: 'ap'
            }
        }
    };
    configureTestSuite();
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, SharedModule.forRoot(), CoreModule, RouterModule.forRoot([])],
            providers: [ConfigService, OrgDetailsService, CacheService, BrowserCacheTtlService, UtilService,
                { provide: ResourceService, useValue: resourceBundle }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(LearnathonLanguageComponent);
        component = fixture.componentInstance;
    });

    it('On language change', () => {
        const utilService = TestBed.get(UtilService);
        const cacheService = TestBed.get(CacheService);
        spyOn(utilService, 'emitLanguageChangeEvent');
        cacheService.set('portalLanguage', 'en', { maxAge: 10 * 60 });
        component.onLanguageChange('en');
        expect(utilService.emitLanguageChangeEvent).toHaveBeenCalled();
    });
    it('On ngOninit for else case', inject([CacheService], (cacheService) => {
        cacheService.set('portalLanguage', null);
        component.ngOnInit();
        expect(component.selectedLanguage).toBe('en');
    }));
    it('should get the interact edata for telemetry', () => {
        const route = TestBed.get(Router);
        route.navigate(['learn?selectedTab=course'])
        .then(() => {
            spyOn(component, 'getTelemetryInteractEdata');
            const result = component.getTelemetryInteractEdata('en');
            expect(result).toEqual({id: 'en-lang', type: 'click', pageid: 'learn'});
        });
    });
});

